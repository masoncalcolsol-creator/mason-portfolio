#!/usr/bin/env python3
"""Execute the pinned CIRIS WiseAuthorityService authorization method directly.

This is a narrow imported-code probe. It does not start the full CIRIS agent or
represent production configuration. It tests whether the current core method
uses the resource value when an AUTHORITY certificate is presented.
"""
from __future__ import annotations

import asyncio
import json
from datetime import datetime, timezone
from unittest.mock import AsyncMock, Mock

from ciris_engine.logic.services.governance.wise_authority import WiseAuthorityService
from ciris_engine.schemas.services.authority_core import WACertificate, WARole


async def run() -> dict[str, object]:
    certificate = WACertificate(
        wa_id="wa-2026-07-31-LIMITED",
        name="NULLWORKS Limited Medical Authority Probe",
        role=WARole.AUTHORITY,
        pubkey="probe_pubkey_base64url",
        jwt_kid="probe_kid",
        scopes_json='["resolve_deferrals:medical_*"]',
        created_at=datetime.now(timezone.utc),
    )

    auth_service = AsyncMock()
    auth_service.bootstrap_if_needed = AsyncMock()
    auth_service.get_wa = AsyncMock(return_value=certificate)

    time_service = Mock()
    time_service.now = Mock(return_value=datetime.now(timezone.utc))
    time_service.timestamp = Mock(return_value=int(datetime.now(timezone.utc).timestamp()))

    service = WiseAuthorityService(
        time_service=time_service,
        auth_service=auth_service,
        db_path=":memory:",
    )

    medical = await service.check_authorization(
        wa_id=certificate.wa_id,
        action="resolve_deferral",
        resource="medical_defer_001",
    )
    financial = await service.check_authorization(
        wa_id=certificate.wa_id,
        action="resolve_deferral",
        resource="financial_defer_001",
    )

    observer_certificate = certificate.model_copy(update={"wa_id": "wa-observer", "role": WARole.OBSERVER})
    auth_service.get_wa = AsyncMock(return_value=observer_certificate)
    observer = await service.check_authorization(
        wa_id=observer_certificate.wa_id,
        action="resolve_deferral",
        resource="medical_defer_001",
    )

    result = {
        "record_type": "NULLWORKS_CIRIS_IMPORTED_CODE_JURISDICTION_PROBE",
        "tested_method": "WiseAuthorityService.check_authorization",
        "authority_scope_declared": ["resolve_deferrals:medical_*"],
        "medical_resource_authorized": medical,
        "financial_resource_authorized": financial,
        "observer_medical_authorized": observer,
        "finding_reproduced": bool(medical is True and financial is True and observer is False),
        "truth_boundary": (
            "Direct execution of the pinned core authorization method with mocked dependencies. "
            "This is not a full agent deployment, API integration test, or production observation."
        ),
    }
    print(json.dumps(result, indent=2))
    return result


if __name__ == "__main__":
    outcome = asyncio.run(run())
    raise SystemExit(0 if outcome["finding_reproduced"] else 3)

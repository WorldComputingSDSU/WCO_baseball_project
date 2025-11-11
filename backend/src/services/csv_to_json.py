import csv
import json
import os
from typing import Iterable, Dict, List

# Columns to keep (in this exact order)
COLUMNS: List[str] = [
    "Pitcher",
    "PitcherThrows",
    "Batter",
    "BatterSide",
    "BatterTeam",
    "Inning",
    "Outs",
    "Balls",
    "Strikes",
    "TaggedPitchType",
    "PitchCall",
    "KorBB",
    "TaggedHitType",
    "PlayResult",
    "OutsOnPlay",
    "RunScored",
    "RelSpeed",
    "VertRelAngle",
    "SpinRate",
    "SpinAxis",
    "RelHeight",
    "RelSide",
    "Extension",
    "InducedVertBreak",
    "HorzBreak",
    "PlateLocHeight",
    "PlateLocSide",
    "VertApprAngle",
    "HorzApprAngle",
    "ExitSpeed",
    "Angle",
    "Direction",
    "HitSpinRate",
    "Distance",
    "Catcher",
    "SpeedDrop",
    "ThrowSpeed",
    "PopTime",
    "ExchangeTime",
    "TimeToBase",
    "BasePositionX",
    "BasePositionY",
    "BasePositionZ",
    "PitchReleaseConfidence",
    "PitchLocationConfidence",
    "PitchMovementConfidence",
    "HitLaunchConfidence",
    "HitLandingConfidence",
    "CatcherThrowReleaseConfidence",
    "CatcherThrowLocationCondience",
]

def process_csv_to_json(
    csv_file_path: str,
    json_file_path: str,
    columns: Iterable[str] = COLUMNS,
    fill_missing: str = ""
) -> None:
    """
    Read csv_file_path and write json_file_path containing only `columns`.
    Missing columns are filled with `fill_missing`.
    """
    # Ensure output dir exists
    out_dir = os.path.dirname(json_file_path)
    if out_dir:
        os.makedirs(out_dir, exist_ok=True)

    extracted: List[Dict[str, str]] = []

    # newline='' avoids extra blank lines on Windows; utf-8-sig handles BOM if present
    with open(csv_file_path, mode='r', newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Keep only requested columns; default to fill_missing if not present
            item = {col: (row.get(col, fill_missing) or fill_missing) for col in columns}
            extracted.append(item)

    with open(json_file_path, mode='w', encoding='utf-8') as out:
        json.dump(extracted, out, indent=4)

if __name__ == "__main__":
    # Edit these as needed (you can also pass absolute paths)
    csv_file_path = '10-17-2025 - Intrasquad 10-17.csv'
    json_file_path = 'backend/output_jsons/output.json'
    print(f"Reading {csv_file_path} -> writing {json_file_path}")
    process_csv_to_json(csv_file_path, json_file_path)
    print("Done.")

# pathlib znacząca ułatwia pracę ze ścieżkami
from csv import DictReader
from pathlib import Path
from subprocess import DEVNULL, run
from typing import TypedDict

"""
Tutaj rglob szuka w folderze "bsa-output"
wszystkich plików z rozszerzeniem ".wav"

Sugeruję dopasować do swojej struktury
"""
wavs_path = Path("bsa-output").rglob("*.wav")
facefx_wrapper = Path("tools", "FaceFXWrapper.exe")
fonix_data = Path("tools", "FonixData.cdf")
source_csv = Path("texts.csv")


class ItemType(TypedDict):
    wav: str
    text: str
    voiceType: str


class Reader:
    data: list[ItemType]
    source_csv: Path

    def __init__(self, source_csv: Path) -> None:
        self.source_csv = source_csv
        with open(source_csv, "r") as f:
            self.data = [*DictReader(f)]

    def find_by_file_name(self, voice_type: str, file_name: str) -> ItemType | None:
        for item in self.data:
            if item["voiceType"] == voice_type and item["wav"] == file_name:
                return item
        return None


def prepare_wav(source: Path) -> Path:
    temp_path = source.with_name(f"{source.stem}.temp.wav")

    cmd = f"ffmpeg -y -i {source} -ac 1 -ar 16000 -c:a pcm_s16le {temp_path}"

    result = run(
        cmd,
        shell=True,
        # Usuwa komunikaty z ffmpega
        # Jak coś nie działa, to usunąć parametry stdout i stderr
        stdout=DEVNULL,
        stderr=DEVNULL,
    )

    if result.returncode != 0:
        raise Exception(f"Failed to convert {source}")

    # Będziemy tego potrzebować w trakcie generowania pliku lip
    return temp_path


def generate_lip(wav: Path, lip_dest: Path, text: str):
    lip_cmd = f'env WINEPREFIX=~/.wine-dotnet wine {facefx_wrapper} "Skyrim" "USEnglish" "{fonix_data}" "{wav}" "{lip_dest}" "{text}"'

    result = run(
        lip_cmd,
        shell=True,
        # Usuwa komunikaty z FaceFXWrapper
        # Jak coś nie działa, to usunąć parametry stdout i stderr
        stdout=DEVNULL,
        stderr=DEVNULL,
    )

    if result.returncode != 0:
        raise Exception(f"Failed to generate lip for {wav}")


def main():
    reader = Reader(source_csv)
    for wav in wavs_path:
        print("Preparing wav for lip gen", wav)
        voice_type = wav.parent.name
        print(f"Searching for text for {wav.name} and {voice_type}")
        item = reader.find_by_file_name(voice_type, wav.name)
        if item is None:
            print(
                f"No text in {source_csv} for given wav and voice_type. Skipping",
                end="\n\n",
            )
            continue
        temp_wav = prepare_wav(wav)
        lip_path = wav.with_name(f"{wav.stem}.lip")
        generate_lip(temp_wav, lip_path, item["text"])
        print("Finished generating lip for", wav)
        temp_wav.unlink()
        print("Removed temp wav", temp_wav, end="\n\n")


main()

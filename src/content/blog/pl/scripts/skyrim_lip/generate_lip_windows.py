from subprocess import run, DEVNULL


def generate_lip(wav: Path, lip_dest: Path, text: str):
    lip_cmd = f'{facefx_wrapper} "Skyrim" "USEnglish" "{fonix_data}" "{wav}" "{lip_dest}" "{text}"'

    result = run(
        lip_cmd,
        shell=True,
        stdout=DEVNULL,
        stderr=DEVNULL,
    )

    if result.returncode != 0:
        raise Exception(f"Failed to generate lip for {wav}")

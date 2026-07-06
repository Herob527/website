---
title: 'ComfyUI - Instalacja'
description: 'Instrukcje instalacji i hostowania ComfyUI lokalnie - Linux'
date: '2026-06-29'
written_by: human
---

## Wstęp

**ComfyUI** to aplikacja, która umożliwia graficzne łączenie ze sobą elementów przetwazania danych.

Takie elementy (tzw. node) mogą ładować CSV, wyciągać tekst na podstawie regexa, uruchamiać trening RVC czy generować tekst z HiggsTTS i to wszystko może się łączyć w ramach jednego łańcucha elementów.

Tutaj dam kroki do instalacji na Linuxie (Fedora 44), bo obecnie na tym testowałem.

To, co tutaj jest opisane jest możliwe do znalezienia w [docsach ComfyUI](https://docs.comfy.org/installation/system_requirements).

## Wstępne wymagania

Sugeruję użyć [mise](https://mise.jdx.dev/) do instalacji [uv](https://docs.astral.sh/uv/getting-started/installation/) poprzez `mise use -g uv`

- python 3.12+
- git
- uv
- terminal / emulator terminala (sam używam wezterm)

## Instalacja

### 1. Sklonuj repozytorium z GitHuba

```bash
git clone https://github.com/Comfy-Org/ComfyUI
```

### 2. Zainstaluj wymagane zależności poprzez uv

```bash
uv pip install -r requirements.txt
```

Ważna rzecz: Tutaj instalacja zakłada GPU od NVIDIA, zatem dla GPU AMD należy zainstalować torch osobno.

Testowane na RX 9070.

```bash
uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm7.2 --reinstall
```

### 3. Uruchom serwer

```bash
uv run main.py
```

### 4. Jak wszystko zadziała, wejdź do panelu w przeglądarce (domyślnie na porcie 8188)

[http://localhost:8188](http://localhost:8188)

### 5. I jesteśmy w panelu

## Rozszerzenia

Samo ComfyUI nie jest, o ironio, _comfy_ gdy trzeba pobrać modele lub rozszerzenia, że trzeba pobrać i wstawić do odpowiedniego folderu we własnym zakresie.

Na szczęście są rozwiązana społeczności, które to ułatwiają.

Ręcznie, by zainstalować rozszerzenie do ComfyUI, należy wejść do folderu `custom_nodes` a następnie tam sklonować repozytorium interesującego nas rozszerzenia z GitHuba.

```bash
echo $(pwd) # Powinien wskazać folder ComfyUI
cd custom_nodes
git clone https://github.com/{user}/{nazwa}
```

Trzeba mieć na uwadze, że rozszerzenia mogą mieć swoje zależności, które trzeba zainstalować zgodnie z instrukcją oraz to, że mogą być konflikty wersji pakietów pythonowych na przykład.

## Polecane rozszerzenia

### ComfyUI Manager

Ten pakiet umożliwia zarządzanie elementami tworzonymi przez społeczność, przez co nie trzeba klonować ręcznie pakietów do folderu `custom_nodes`

Link: [https://github.com/comfy-org/ComfyUI-Manager](https://github.com/comfy-org/ComfyUI-Manager)

### ComfyUI Workflow Models Downloader

Ten pakiet umożliwia pobranie brakujących modeli dla danego node'a, oszczędzając tym samym wizyty na Huggingface czy innych serwisach hostujących modele, bo rozszerzenie zrobi to za nas.

Link: [https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader](https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader)

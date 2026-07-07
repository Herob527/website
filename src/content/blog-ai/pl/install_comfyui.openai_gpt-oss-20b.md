
---
parentId: install_comfyui
written_by: openai/gpt-oss-20b
---
## Wstęp

**ComfyUI** jest aplikacją, która pozwala tworzyć wizualne przepływy danych.  
W programie możesz połączyć różne *node* (np. wczytanie CSV, wyciągnięcie tekstu przy pomocy regexa, uruchomienie treningu RVC czy generowanie tekstu z HiggsTTS) i stworzyć jeden ciąg operacji.

Poniżej znajdziesz instrukcje instalacji na Linuxie (Fedora 44).  
Jeśli chcesz sprawdzić pełną dokumentację, odwiedź [docs ComfyUI](https://docs.comfy.org/installation/system_requirements).

## Wstępne wymagania

- **Python 3.12+** – wersja jest wymagana.
- **git** – potrzebny do klonowania repozytorium.
- **uv** – narzędzie do instalacji pakietów Python.  
  Możesz zainstalować `uv` przy pomocy `mise`:  
  ```bash
  mise use -g uv
  ```
- Terminal (lub emulator terminala). Ja używam wezterm.

## Instalacja

### 1️⃣ Sklonuj repozytorium z GitHub

```bash
git clone https://github.com/Comfy-Org/ComfyUI
```

### 2️⃣ Zainstaluj zależności przy pomocy `uv`

```bash
uv pip install -r requirements.txt
```

> **Uwaga:**  
> Instalacja domyślnie zakłada GPU NVIDIA. Jeśli korzystasz z GPU AMD, musisz dodatkowo zainstalować PyTorch z repozytorium ROCm.

```bash
uv pip install torch torchvision torchaudio \
  --index-url https://download.pytorch.org/whl/rocm7.2 \
  --reinstall
```

> Testowane na RX 9070.

### 3️⃣ Uruchom serwer

```bash
uv run main.py
```

### 4️⃣ Otwórz panel w przeglądarce

Serwer domyślnie działa na porcie **8188**.  
Przejdź do:  

[http://localhost:8188](http://localhost:8188)

### 5️⃣ Panel jest gotowy!

## Rozszerzenia

ComfyUI sam w sobie nie dostarcza modeli ani rozszerzeń – trzeba je pobrać i umieścić w odpowiednim folderze.  
W praktyce społeczność udostępnia narzędzia, które to upraszcza.

### Instalacja ręczna rozszerzenia

1. Przejdź do folderu `custom_nodes`:

```bash
echo $(pwd) # powinien wskazać folder ComfyUI
cd custom_nodes
```

2. Sklonuj repozytorium interesującego rozszerzenia z GitHub:

```bash
git clone https://github.com/{user}/{nazwa}
```

> **Uwaga:**  
> Rozszerzenia mogą mieć własne zależności, które trzeba zainstalować zgodnie z instrukcjami.  
> Może też wystąpić konflikt wersji pakietów Pythonowych.

### Polecane rozszerzenia

#### ComfyUI Manager

- Ułatwia zarządzanie elementami tworzonymi przez społeczność – nie musisz klonować ręcznie pakiety do `custom_nodes`.  
  Link: [https://github.com/comfy-org/ComfyUI-Manager](https://github.com/comfy-org/ComfyUI-Manager)

#### ComfyUI Workflow Models Downloader

- Pobiera brakujące modele dla konkretnego node, dzięki czemu nie musisz odwiedzać Huggingface ani innych serwisów hostujących modele.  
  Link: [https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader](https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader)  

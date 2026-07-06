
---
parentId: install_comfyui
written_by: qwen3-0.6b
---


## Instalacja ComfyUI na Linux  

ComfyUI to aplikacja, która umożliwia graficzne łączenie elementów przetwarzania danych. Taka elementy (tzw. *nodes*) mogą ładować CSV, wyciągać tekst na podstawie regexa, uruchamiać trening RVC czy generować tekst z HiggsTTS i to wszystko można łączyć w ramach jednego *łańcucha elementów*.  

### Wstępne wymagania  
- Python 3.12+  
- Git  
- `uv` (od systemu)  
- Terminal/EMULATOR terminala  

---

## Instalacja ComfyUI  

### 1. Sklonuj repozytorium z GitHuba  
```bash
git clone https://github.com/Comfy-Org/ComfyUI
```

---

### 2. Zainstaluj wymagane zależności poprzez `uv`  
```bash
uv pip install -r requirements.txt
```

**Zalecana instalaacja na GPU AMD:**  
```bash
uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm7.2 --reinstall
```

---

### 3. Uruchom serwer  
```bash
uv run main.py
```

---

### 4. Wszystko jest w panelu  
Wejdź do folderu `custom_nodes` i zainstaluj rozszerzenia:  
```bash
cd custom_nodes
git clone https://github.com/{username}/{model-name}
```

---

## Polecane rozszerzenia  

### ComfyUI Manager  
- Klonuje pliki do folderów `custom_nodes`.  
- Przygotowuje się na zarządzanie elementami.  

### ComfyUI Workflow Models Downloader  
- Pobiera modele dla danego node, oszczędza wizyty na HuggingFace.  

--- 

Jeśli chcesz, mogę też podać komendy do testowania rozszerzeń:  
```bash
uv run main.py --model-name <model>
```  

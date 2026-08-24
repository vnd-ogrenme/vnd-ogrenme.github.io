# VND Öğrenme — modern GitHub Pages sürümü

Bu sürüm, mevcut Neumorphism/Bootstrap ağırlıklı tasarımın yerine bağımlılığı düşük, sade ve veri odaklı bir statik site yapısı sunar.

## Klasör yapısı

```text
/
├── index.html
├── haberler.html
├── haber.html             # haber detay sayfası
├── gecmis.html
├── yayinlar.html
├── sonuclar.html
├── assets/
│   ├── css/site.css
│   ├── js/site.js
│   └── img/              # mevcut görsellerinizi buraya kopyalayın
└── data/
    ├── project.json
    ├── news.json
    ├── timeline.json
    ├── publications.json
    └── results.json
```

## Yeni haber eklemek

`data/news.json` içine yeni bir nesne ekleyin. En güncel haberler ana sayfada otomatik görünür.

```json
{
  "id": "yeni-makale-2026",
  "date": "2026-08-24",
  "displayDate": "24 Ağustos 2026",
  "type": "Yayın",
  "title": "Yeni makalemiz yayımlandı",
  "summary": "Haber kartında görünen kısa açıklama.",
  "image": "./assets/img/yeni-haber.jpg",
  "content": [
    "Haber detay sayfasındaki ilk paragraf.",
    "İkinci paragraf."
  ],
  "meta": ["Etkinlik veya kurum", "Şehir"],
  "links": [
    {"label": "Yayını görüntüle", "url": "https://..."}
  ]
}
```

## Proje geçmişine kayıt eklemek

`data/timeline.json` içine bir kayıt ekleyin. Tarih filtresi otomatik oluşur.

```json
{
  "id": "benzersiz-kisa-id",
  "date": "2026-08-24",
  "displayDate": "24 Ağustos 2026",
  "year": "2026",
  "category": "Araştırma",
  "title": "Yeni kilometre taşı",
  "description": "Kısa açıklama."
}
```

## Yayın eklemek

`data/publications.json` içine kayıt ekleyin. Tür filtreleri otomatik oluşur.

```json
{
  "year": 2026,
  "type": "Journal article",
  "title": "Makale başlığı",
  "venue": "Dergi adı",
  "doi": "10.xxxx/xxxxx",
  "url": "https://doi.org/10.xxxx/xxxxx"
}
```

## Sonuç eklemek

`data/results.json` proje çıktıları için serbest modül yapısıdır. `links` dizisine GitHub, DOI, PDF veya veri bağlantıları eklenebilir.

## Yerelde görüntüleme

JSON dosyaları `fetch()` ile yüklendiği için dosyaları doğrudan `file://` ile açmak yerine basit bir yerel sunucu kullanın:

```bash
python3 -m http.server 8000
```

Ardından `http://localhost:8000` adresini açın.

## GitHub Pages'e taşıma

Bu klasördeki dosyaları mevcut repository köküne kopyalayın. Mevcut `assets/img` içindeki proje görsellerinizi koruyun / yeni yapının `assets/img` klasörüne taşıyın. GitHub Pages statik JSON dosyalarını sorunsuz servis eder.

---
permalink: /
title: "VND Öğrenme"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Vuru Üreten Nöral Devreler ve Öngörüsel Kodlamanın Birlikte Kullanılması ile Yeni Bir Öğrenme Kuralının Geliştirilmesi

Özet
======
Son yıllarda yapay zeka alanındaki çalışmaların çok etkili sonuçlar vermesi insan beyninden esinlenerek
önerilen yapay sinir ağ (YSA) yapılarına dayanan farklı süreçlerin ele alınmasından kaynaklanmıştır. YSA’ların örüntü
tanıma, sınıflandırma ve doğal dil işleme gibi konulardaki başarısından yola çıkarak gerçek zamanlı hesaplamada
kullanılabilecek, mevcut von Neumann mimarisinden daha verimli ve tıpkı beyin gibi az enerji harcayan donanımlar
üzerinde uygulanması düşünülmüştür. Bu mimarilerden birisi de beyinde yer alan hesaplama ilkelerini donanım üzerinde
gerçekleştirmeyi amaçlayan nöromorfik donanımlardır. Nöromorfik donanımlar mevcut yapısı itibariyle geleneksel
bilgisayar mimarisinden çok daha az enerji harcamalarına rağmen, uygulamada sadece nöromorfik devreler üzerinden
gitmenin yeni öğrenme algoritmasını geliştirmede kısıtlamalar oluşturması istenmeyen bir durumdur. Hali hazırda
nöromorfik donanımlara ulaşmanın zor olması, von Neumann mimarisinin uygulanabilirlik avantajından faydalanılmak
istenmesi ve her iki donanımın bir çok parametre üzerinden karşılaştırılmak istenmesi nedeniyle çeşitliliğe bağlı
kalınmasında fayda olduğu düşünülmektedir.
YSA’ların güçlü yanlarına rağmen parametre optimizasyonu ve katastrofik unutma gibi dezavantajlara sahip olması ve
beyindeki nöronlardan ve çalışma prensibinden az ilham alması beyinde ki süreçleri daha gerçekçi ele alan farklı yapıların
geliştirilmesini sağlamıştır. Tam da bu noktada Veri Üreten Nöral Devreler (VND) nöronlar arasında bilgi taşınmasının
kimyasal süreçlerini açıklaması ve daha etkin öğrenme kurallarının ele alınabilir olması nedeniyle kullanılan bir yöntem
olarak yer almaktadır. Her ne kadar VND’lerin asıl amacının YSA’ların yerini almak olmasa da son yapılan çalışmalarda
VND’ler kompleks örüntüleri işleyerek gürültülü ortamlarda benzer performanslar göstermeye başlamışlardır. Örneğin el
yazısı sayılardan oluşan MNIST veri setinde üzerinde yapılan sınıflandırmalarda %90 üzerinde başarı sağlanabilmiştir.
YSA nöronları devamlı değişen parametreler üzerinden haberleşirler ve karakteristik olarak türevlenebilen aktivasyon
veya transfer fonksiyonları gerektirirler. Biyolojik olarak nöronlar arasındaki iletişim ayrık zamanlı ve aksiyon
potansiyellerinin yayılımı sayesinde gerçekleştiği için, aksiyon potansiyelini oluşturan vuru dizileri oldukça fazla bilgi
taşırlar. Nöronları birbirine bağlayan sinaptik ağırlıkların ayarlanması VND ağlarının en büyük zorluklarından birisi olarak
ortaya çıkar. Beyinde öğrenme ve bilgi depolamanın arkasındaki temel unsur olarak görülen ve sinaptik ağırlıkların
ayarlandığı en popüler metot ise STDP olarak karşımıza çıkmaktadır. Fakat STDP’nin vuru dizilerinin zamansal
sıralamasını dikkate alması artımlı gerçek zamanlı öğrenme için kullanışlı bir yöntem olmasını engellemektedir. Halbuki
yapılan araştırmalardan görüldüğü üzere insan beyni gerçek zamanlı olarak öğrenmeyi gerçekleştirebilmektedir. VND’ler
için düşünüldüğünde sinaptik ağırlıkların çevrim içi olarak ayarlanması hala bir engel teşkil ettiğinden, birden fazla
katmandan oluşan bir ağda STDP ile kontrol edilen ağırlıkların düzenlenerek VND’nin eğitilmesi zorlaşmaktadır. Burada
Kazanan Hepsini Alır (KHA) ve öngörüsel kodlama yöntemlerini içeren bir VND yapısı kullanmanın avantaj sağlayacağı
düşünülmektedir. Öngörüsel kodlama beyni, aktif bir şekilde öngörü üreten ve sonrasında çevresel uyaranların varlığında
kendisini anında düzelten bir model ile tasvir etmektedir. İstatistiksel bir pencereden bakıldığında öngörüsel kodlamanın
sinaptik ağırlıkların lokal olarak gerçekleştirilebilmesi için kullanılması nispeten yeni bir bakış açısı sunmaktadır.
Nöromorfik donanımlar açısından bakıldığında hala biyoloji bir beyin kadar verimli olmasa bile yoğun hesaplamalı
işlemlerde geleneksel bilgisayarlara göre çok daha düşük enerji tüketildiği bilinmektedir. Örneğin 1 milyon nöron ve 256
milyon sinaptik bağlantı içeren bir nöromorfik bilgisayar 70 miliwatt güç tüketmektedir. Farklı metotların iç içe olduğu
kompleks görevler yerine getiren VND ağının nöfomorfik donanım üzerindeki karakteristiği önemli bir aşama olacaktır.
Mevcut ileri beslemeli veya yinelemeli YSA gibi çalışan VND’lerin aksine, çevresel uyaranlarla kendisini yenileyen,
öngörüsel kodlamanın entegre edildiği, farklı bir yaklaşım ile geliştirilmiş bir STDP yöntemine sahip ve KHA mekanizması
içeren VND yapısı nöromorfik donanımlar üzerinde test edilmemiştir. Bu projenin özgün değeri nöral üretken kodlamaya
sahip bir VND’nin, lokal öğrenme kuralı ile öngörüsel kodlamayı kullanarak örüntü tanıma yapabilecek forma
getirilmesi ve sistemin robotik bir donanım üzerinde çalıştırılmasıdır.

Yöntem
======
Proje amacına ulaşmak için 4 ana hedef belirlenmiştir: i) VND kullanılarak MNIST veri setinde STDP öğrenme
yöntemi ile sınıflandırma yapılması; ii) Öngörüsel kodlamanın algoritmaya entegre edilerek nöral üretken kodlamanın
VND’yi sürekli biçimde hata-düzeltimi yapacak düzeye getirmesi; iii) KHA mekanizmasının farklı bir STDP öğrenme kuralı
ile test edilmesi ve sonuçların karşılaştırılması; iv) Öngörüsel kodlama, KHA ve lokal olarak yenilen öğrenme
algoritmasının nöromorfik donanım üzerinde denenerek etkinliğinin ölçülmesi.
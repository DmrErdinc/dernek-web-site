import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Veritabanı seed işlemi başlıyor...')

  // Admin kullanıcı oluştur
  const hashedPassword = await bcrypt.hash('demir', 10)
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  })
  console.log('✅ Admin kullanıcı oluşturuldu:', admin.username)

  // Site ayarları
  const siteSettings = await prisma.siteSettings.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      siteName: 'Ölümsüz Kahramanlar Derneği',
      siteSlogan: 'Kahramanlarımızı Yaşatıyoruz',
      phone: '+90 (212) 555 0000',
      email: 'info@kahramanlardernegi.org',
      address: 'Atatürk Mahallesi, Cumhuriyet Caddesi No:123, Kadıköy/İstanbul',
      facebookUrl: 'https://facebook.com/kahramanlardernegi',
      twitterUrl: 'https://twitter.com/kahramanlardernegi',
      instagramUrl: 'https://instagram.com/kahramanlardernegi',
      metaTitle: 'Ölümsüz Kahramanlar Derneği - Kahramanlarımızı Yaşatıyoruz',
      metaDescription: 'Ölümsüz Kahramanlar Derneği olarak, vatanımız için canlarını feda eden kahramanlarımızın hatıralarını yaşatıyor, ailelerine destek oluyor ve gelecek nesillere bu değerleri aktarıyoruz.',
    },
  })
  console.log('✅ Site ayarları oluşturuldu')

  // Hakkımızda sayfası
  const aboutPage = await prisma.pageContent.upsert({
    where: { page: 'about' },
    update: {},
    create: {
      page: 'about',
      title: 'Hakkımızda',
      content: 'Ölümsüz Kahramanlar Derneği, vatanımız için canlarını feda eden kahramanlarımızın hatıralarını yaşatmak, ailelerine destek olmak ve gelecek nesillere bu değerleri aktarmak amacıyla kurulmuştur.',
      mission: 'Şehitlerimizin ve gazilerimizin hatıralarını yaşatmak, ailelerine maddi ve manevi destek sağlamak, toplumda vatan sevgisi ve kahramanlık bilincini güçlendirmek.',
      vision: 'Türkiye\'nin her köşesinde kahramanlarımızın hatıralarının yaşatıldığı, ailelerinin desteklendiği ve gelecek nesillerin bu değerlerle yetiştiği bir toplum oluşturmak.',
      history: 'Derneğimiz 2015 yılında bir grup gönüllü vatansever tarafından kurulmuştur. O günden bu yana binlerce aileye ulaştık ve onlarca proje gerçekleştirdik.',
      values: 'Vatan sevgisi, fedakarlık, dayanışma, şeffaflık, güvenilirlik ve süreklilik temel değerlerimizdir.',
      goals: 'Şehit ve gazi ailelerine destek olmak, anma etkinlikleri düzenlemek, eğitim projeleri yürütmek, sosyal sorumluluk projeleri geliştirmek.',
    },
  })
  console.log('✅ Hakkımızda sayfası oluşturuldu')

  // Haber kategorileri
  const newsCategories = await Promise.all([
    prisma.newsCategory.upsert({
      where: { slug: 'duyurular' },
      update: {},
      create: { name: 'Duyurular', slug: 'duyurular' },
    }),
    prisma.newsCategory.upsert({
      where: { slug: 'haberler' },
      update: {},
      create: { name: 'Haberler', slug: 'haberler' },
    }),
    prisma.newsCategory.upsert({
      where: { slug: 'basin-bultenleri' },
      update: {},
      create: { name: 'Basın Bültenleri', slug: 'basin-bultenleri' },
    }),
  ])
  console.log('✅ Haber kategorileri oluşturuldu')

  // Haberler
  const news = await Promise.all([
    prisma.news.create({
      data: {
        title: 'Yeni Eğitim Bursu Programı Başladı',
        slug: 'yeni-egitim-bursu-programi-basladi',
        summary: 'Şehit çocuklarına yönelik kapsamlı eğitim bursu programımız hayata geçirildi.',
        content: 'Derneğimiz, şehit çocuklarının eğitim hayatlarını desteklemek amacıyla yeni bir burs programı başlattı. Program kapsamında 100 öğrenciye tam burs imkanı sağlanacak. Başvurular 1 Mayıs tarihinde başlayacak. Burs programı, ilkokul, ortaokul, lise ve üniversite öğrencilerini kapsıyor. Başvuru için gerekli belgeler web sitemizde yayınlandı.',
        categoryId: newsCategories[0].id,
        isPublished: true,
        publishedAt: new Date(),
      },
    }),
    prisma.news.create({
      data: {
        title: '15 Temmuz Anma Etkinliği Düzenlendi',
        slug: '15-temmuz-anma-etkinligi-duzenlendi',
        summary: '15 Temmuz şehitlerimizi anmak için özel bir program düzenledik.',
        content: '15 Temmuz Demokrasi ve Milli Birlik Günü dolayısıyla derneğimiz tarafından anma programı düzenlendi. Programa şehit aileleri, gaziler ve çok sayıda vatandaş katıldı. Program duygulu anlar yaşandı. Etkinlikte şehitlerimiz için saygı duruşunda bulunuldu ve İstiklal Marşı okundu. Şehit yakınları duygusal konuşmalar yaptı.',
        categoryId: newsCategories[1].id,
        isPublished: true,
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.news.create({
      data: {
        title: 'Yeni Şube Açılışı Yapıldı',
        slug: 'yeni-sube-acilisi-yapildi',
        summary: 'Ankara\'da yeni şubemiz hizmete açıldı.',
        content: 'Derneğimizin Ankara şubesi törenle açıldı. Açılışa çok sayıda davetli katıldı. Yeni şubemiz ile daha fazla aileye ulaşmayı hedefliyoruz. Ankara şubemiz, başkent ve çevresindeki şehit ve gazi ailelerine daha yakın hizmet verecek. Şubemizde psikolojik danışmanlık, hukuki destek ve sosyal aktivite hizmetleri sunulacak.',
        categoryId: newsCategories[2].id,
        isPublished: true,
        publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.news.create({
      data: {
        title: 'Kış Yardım Kampanyası Başladı',
        slug: 'kis-yardim-kampanyasi-basladi',
        summary: 'Şehit ve gazi ailelerine kış yardımı yapıyoruz.',
        content: 'Derneğimiz, kış aylarında şehit ve gazi ailelerine yönelik yardım kampanyası başlattı. Kampanya kapsamında kömür, gıda ve giyim yardımı yapılacak. Bağışçılarımızın desteğiyle 500 aileye ulaşmayı hedefliyoruz. Yardım başvuruları dernek merkezimizden ve web sitemizden alınıyor.',
        categoryId: newsCategories[0].id,
        isPublished: true,
        publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.news.create({
      data: {
        title: 'Gençlik Kampı Düzenlendi',
        slug: 'genclik-kampi-duzenlendi',
        summary: 'Şehit çocukları için yaz kampı organize ettik.',
        content: 'Derneğimiz, şehit çocukları için 5 günlük gençlik kampı düzenledi. Kampa 150 genç katıldı. Kamp süresince spor aktiviteleri, atölye çalışmaları ve sosyal etkinlikler yapıldı. Gençlerimiz hem eğlendi hem de yeni arkadaşlıklar kurdu. Kamp, profesyonel eğitmenler eşliğinde gerçekleştirildi.',
        categoryId: newsCategories[1].id,
        isPublished: true,
        publishedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.news.create({
      data: {
        title: 'Sağlık Taraması Programı',
        slug: 'saglik-taramas-programi',
        summary: 'Gazi ailelerine ücretsiz sağlık taraması hizmeti sunuyoruz.',
        content: 'Derneğimiz, özel hastanelerle işbirliği yaparak gazi ailelerine ücretsiz sağlık taraması hizmeti sunuyor. Program kapsamında genel check-up, göz muayenesi ve diş kontrolü yapılıyor. Şimdiye kadar 200 kişi bu hizmetten yararlandı. Randevu almak için dernek merkezimizi arayabilirsiniz.',
        categoryId: newsCategories[0].id,
        isPublished: true,
        publishedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
      },
    }),
  ])
  console.log('✅ Haberler oluşturuldu')

  // Etkinlikler
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Şehitler İçin Anma Yürüyüşü',
        slug: 'sehitler-icin-anma-yuruyusu',
        description: 'Şehitlerimizi anmak için düzenlenen yürüyüşe tüm vatandaşlarımızı davet ediyoruz. Yürüyüş sonrası anma programı düzenlenecektir. Şehit aileleri ve gazilerimiz de katılacak. Etkinlik saat 14:00\'te başlayacak ve yaklaşık 2 saat sürecek.',
        location: 'Taksim Meydanı, İstanbul',
        eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        eventTime: '14:00',
        isPublished: true,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Gazi Ailelerine Yönelik Seminer',
        slug: 'gazi-ailelerine-yonelik-seminer',
        description: 'Gazi ailelerimize yönelik psikolojik destek ve hukuki haklar semineri düzenlenecektir. Uzman psikolog ve avukatlar katılacaktır. Seminer ücretsizdir ve katılım için ön kayıt gerekmektedir. Seminer sonunda soru-cevap bölümü olacak.',
        location: 'Dernek Merkezi, Kadıköy/İstanbul',
        eventDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        eventTime: '10:00',
        isPublished: true,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Çanakkale Şehitliklerine Ziyaret',
        slug: 'canakkale-sehitliklerine-ziyaret',
        description: 'Çanakkale şehitliklerini ziyaret etmek için özel bir program düzenliyoruz. Ulaşım ve konaklama derneğimiz tarafından karşılanacaktır. 2 gün 1 gece konaklama dahildir. Rehberli tur yapılacak. Katılım için son başvuru tarihi 15 gün öncesidir.',
        location: 'Çanakkale',
        eventDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        eventTime: '08:00',
        isPublished: true,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Şehit Çocukları Piknik Etkinliği',
        slug: 'sehit-cocuklari-piknik-etkinligi',
        description: 'Şehit çocuklarımız için doğa içinde piknik etkinliği düzenliyoruz. Çocuklar için oyun ve aktiviteler olacak. Yemek ve içecekler derneğimiz tarafından karşılanacak. Aileler de katılabilir. Ücretsiz servis hizmeti mevcut.',
        location: 'Polonezköy Tabiat Parkı, İstanbul',
        eventDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        eventTime: '10:00',
        isPublished: true,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Mesleki Eğitim Fuarı',
        slug: 'mesleki-egitim-fuari',
        description: 'Gazi ve şehit ailelerine yönelik mesleki eğitim fuarı düzenliyoruz. Fuarda çeşitli meslek kursları tanıtılacak ve iş imkanları hakkında bilgi verilecek. Katılım ücretsizdir. Fuar 2 gün sürecek.',
        location: 'İstanbul Fuar Merkezi',
        eventDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
        eventTime: '09:00',
        isPublished: true,
      },
    }),
  ])
  console.log('✅ Etkinlikler oluşturuldu')

  // Projeler
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'Eğitim Destek Projesi',
        slug: 'egitim-destek-projesi',
        summary: 'Şehit ve gazi çocuklarına eğitim desteği sağlıyoruz.',
        description: 'Bu proje kapsamında şehit ve gazi çocuklarına burs, kırtasiye yardımı ve özel ders desteği sağlanmaktadır. Proje 2020 yılından bu yana devam etmektedir ve 500\'den fazla öğrenciye ulaşılmıştır. Öğrencilere ayrıca bilgisayar ve tablet desteği de verilmektedir. Üniversite öğrencilerine barınma yardımı yapılmaktadır.',
        category: 'Eğitim',
        startDate: new Date('2020-01-01'),
        isPublished: true,
      },
    }),
    prisma.project.create({
      data: {
        title: 'Sosyal Destek Programı',
        slug: 'sosyal-destek-programi',
        summary: 'Ailelere psikolojik ve sosyal destek sağlıyoruz.',
        description: 'Şehit ve gazi ailelerine yönelik psikolojik danışmanlık, sosyal aktiviteler ve dayanışma programları düzenlenmektedir. Uzman psikologlar eşliğinde grup terapileri ve bireysel görüşmeler yapılmaktadır. Aileler için haftalık sosyal aktiviteler organize edilmektedir. Çocuklar için oyun terapisi uygulanmaktadır.',
        category: 'Sosyal Destek',
        startDate: new Date('2021-06-01'),
        isPublished: true,
      },
    }),
    prisma.project.create({
      data: {
        title: 'İstihdam Destek Projesi',
        slug: 'istihdam-destek-projesi',
        summary: 'Gazi ve şehit ailelerine iş bulma konusunda destek oluyoruz.',
        description: 'Gazilerimize ve şehit ailelerine iş bulma, meslek edindirme kursları ve girişimcilik eğitimleri veriyoruz. Özel sektör ile işbirliği yaparak istihdam imkanları oluşturuyoruz. Bilgisayar, muhasebe, dikiş-nakış gibi çeşitli meslek kursları düzenlenmektedir. Girişimcilik için mikro kredi desteği sağlanmaktadır.',
        category: 'İstihdam',
        startDate: new Date('2022-03-01'),
        isPublished: true,
      },
    }),
    prisma.project.create({
      data: {
        title: 'Sağlık Destek Projesi',
        slug: 'saglik-destek-projesi',
        summary: 'Gazi ailelerine sağlık hizmetleri sunuyoruz.',
        description: 'Gazi ailelerimize ücretsiz sağlık taraması, ilaç yardımı ve tedavi desteği sağlıyoruz. Özel hastanelerle anlaşmalar yaparak indirimli sağlık hizmeti sunuyoruz. Fizik tedavi ve rehabilitasyon hizmetleri veriyoruz. Evde bakım hizmeti ihtiyacı olanlara destek oluyoruz.',
        category: 'Sağlık',
        startDate: new Date('2023-01-01'),
        isPublished: true,
      },
    }),
    prisma.project.create({
      data: {
        title: 'Konut Yardım Projesi',
        slug: 'konut-yardim-projesi',
        summary: 'İhtiyaç sahibi ailelere konut desteği sağlıyoruz.',
        description: 'Şehit ve gazi ailelerinden ihtiyaç sahiplerine kira yardımı yapıyoruz. Ev tadilatı ve onarım desteği sağlıyoruz. Mobilya ve beyaz eşya yardımı yapıyoruz. Kömür ve doğalgaz faturalarına destek oluyoruz. Proje kapsamında 100\'den fazla aileye ulaşıldı.',
        category: 'Sosyal Yardım',
        startDate: new Date('2022-09-01'),
        isPublished: true,
      },
    }),
  ])
  console.log('✅ Projeler oluşturuldu')

  // Galeri kategorileri
  const galleryCategories = await Promise.all([
    prisma.galleryCategory.upsert({
      where: { slug: 'etkinlikler' },
      update: {},
      create: { name: 'Etkinlikler', slug: 'etkinlikler' },
    }),
    prisma.galleryCategory.upsert({
      where: { slug: 'ziyaretler' },
      update: {},
      create: { name: 'Ziyaretler', slug: 'ziyaretler' },
    }),
    prisma.galleryCategory.upsert({
      where: { slug: 'projeler' },
      update: {},
      create: { name: 'Projeler', slug: 'projeler' },
    }),
  ])
  console.log('✅ Galeri kategorileri oluşturuldu')

  // Yönetim kurulu
  const boardMembers = await Promise.all([
    prisma.boardMember.create({
      data: {
        name: 'Mehmet Yılmaz',
        position: 'Başkan',
        bio: '20 yıllık sivil toplum deneyimi olan Mehmet Yılmaz, derneğimizin kurucu başkanıdır. İşletme yüksek lisansı mezunudur ve sosyal sorumluluk projelerinde aktif rol almaktadır.',
        gender: 'male',
        order: 1,
        isPublished: true,
      },
    }),
    prisma.boardMember.create({
      data: {
        name: 'Ayşe Demir',
        position: 'Başkan Yardımcısı',
        bio: 'Sosyal hizmet uzmanı Ayşe Demir, ailelerimize destek programlarını yönetmektedir. 15 yıldır sosyal hizmetler alanında çalışmaktadır.',
        gender: 'female',
        order: 2,
        isPublished: true,
      },
    }),
    prisma.boardMember.create({
      data: {
        name: 'Ali Kaya',
        position: 'Genel Sekreter',
        bio: 'Hukuk fakültesi mezunu Ali Kaya, derneğimizin idari işlerini yürütmektedir. Dernekler hukuku konusunda uzmandır.',
        gender: 'male',
        order: 3,
        isPublished: true,
      },
    }),
    prisma.boardMember.create({
      data: {
        name: 'Fatma Şahin',
        position: 'Sayman',
        bio: 'Mali müşavir Fatma Şahin, derneğimizin mali işlerinden sorumludur. 10 yıllık muhasebe deneyimine sahiptir.',
        gender: 'female',
        order: 4,
        isPublished: true,
      },
    }),
    prisma.boardMember.create({
      data: {
        name: 'Hasan Öztürk',
        position: 'Üye',
        bio: 'Emekli öğretmen Hasan Öztürk, eğitim projelerimizin koordinasyonunu yapmaktadır. 30 yıllık öğretmenlik deneyimi vardır.',
        gender: 'male',
        order: 5,
        isPublished: true,
      },
    }),
    prisma.boardMember.create({
      data: {
        name: 'Zeynep Arslan',
        position: 'Üye',
        bio: 'Psikolog Zeynep Arslan, psikolojik destek programlarımızı yönetmektedir. Travma ve kayıp danışmanlığı konusunda uzmandır.',
        gender: 'female',
        order: 6,
        isPublished: true,
      },
    }),
    prisma.boardMember.create({
      data: {
        name: 'Mustafa Çelik',
        position: 'Üye',
        bio: 'İş insanı Mustafa Çelik, istihdam projelerimizde özel sektör ile köprü görevi görmektedir. Çeşitli şirketlerde üst düzey yöneticilik yapmıştır.',
        gender: 'male',
        order: 7,
        isPublished: true,
      },
    }),
  ])
  console.log('✅ Yönetim kurulu oluşturuldu')

  // SSS
  const faqs = await Promise.all([
    prisma.fAQ.create({
      data: {
        question: 'Derneğe nasıl üye olabilirim?',
        answer: 'Derneğimize üye olmak için web sitemizden üyelik formunu doldurabilir veya dernek merkezimize başvurabilirsiniz. Üyelik işlemleri ücretsizdir.',
        order: 1,
        isPublished: true,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: 'Bağış yapmak için hangi yöntemleri kullanabilirim?',
        answer: 'Bağışlarınızı banka havalesi, EFT veya kredi kartı ile yapabilirsiniz. Bağış sayfamızda detaylı bilgi bulabilirsiniz.',
        order: 2,
        isPublished: true,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: 'Gönüllü olarak nasıl katkı sağlayabilirim?',
        answer: 'Gönüllü olmak için iletişim formumuzdan başvurabilirsiniz. Etkinliklerimizde, projelerimizde ve ofis çalışmalarımızda gönüllülerimize ihtiyacımız var.',
        order: 3,
        isPublished: true,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: 'Şehit veya gazi ailesiyim, nasıl destek alabilirim?',
        answer: 'Dernek merkezimize başvurarak veya iletişim formumuzdan ulaşarak destek talebinde bulunabilirsiniz. Uzman ekibimiz sizinle iletişime geçecektir.',
        order: 4,
        isPublished: true,
      },
    }),
  ])
  console.log('✅ SSS oluşturuldu')

  // Bağış bilgileri
  const donationInfo = await prisma.donationInfo.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      title: 'Bağış Bilgileri',
      description: 'Derneğimize yapacağınız bağışlar, şehit ve gazi ailelerimize destek olmak için kullanılacaktır. Bağışlarınız vergi indirimi kapsamındadır.',
      bankName: 'Ziraat Bankası',
      accountHolder: 'Ölümsüz Kahramanlar Derneği',
      iban: 'TR00 0000 0000 0000 0000 0000 00',
      swiftCode: 'TCZBTR2AXXX',
    },
  })
  console.log('✅ Bağış bilgileri oluşturuldu')

  // Hero bölümü
  const heroSection = await prisma.heroSection.create({
    data: {
      title: 'Kahramanlarımızı Yaşatıyoruz',
      subtitle: 'Ölümsüz Kahramanlar Derneği',
      description: 'Vatanımız için canlarını feda eden kahramanlarımızın hatıralarını yaşatıyor, ailelerine destek oluyor ve gelecek nesillere bu değerleri aktarıyoruz.',
      images: [],
      buttonText: 'Bize Katılın',
      buttonLink: '/iletisim',
      isActive: true,
      order: 1,
    },
  })
  console.log('✅ Hero bölümü oluşturuldu')

  // Yasal metinler (Gizlilik Politikası ve KVKK)
  const privacyPage = await prisma.legalPage.upsert({
    where: { page: 'privacy' },
    update: {},
    create: {
      page: 'privacy',
      title: 'Gizlilik Politikası',
      content: `Ölümsüz Kahramanlar Derneği olarak, kişisel verilerinizin güvenliği bizim için son derece önemlidir. Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde toplanan bilgilerin nasıl kullanıldığını ve korunduğunu açıklamaktadır.

TOPLANAN BİLGİLER

Web sitemizi kullanırken aşağıdaki bilgiler toplanabilir:
- Ad, soyad ve iletişim bilgileri (e-posta, telefon)
- İletişim formları aracılığıyla gönderilen mesajlar
- Bağış yapanların kimlik ve ödeme bilgileri
- Web sitesi kullanım verileri (IP adresi, tarayıcı bilgisi, ziyaret edilen sayfalar)
- Çerez (cookie) verileri

BİLGİLERİN KULLANIM AMACI

Toplanan kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:
- İletişim taleplerini yanıtlamak
- Bağış işlemlerini gerçekleştirmek ve kayıt altına almak
- Dernek faaliyetleri hakkında bilgilendirme yapmak
- Web sitesi performansını iyileştirmek
- Yasal yükümlülükleri yerine getirmek
- Etkinlik ve duyuru bildirimlerini göndermek

VERİ GÜVENLİĞİ

Kişisel verilerinizin güvenliğini sağlamak için teknik ve idari önlemler alınmaktadır. Veriler şifreli bağlantılar (SSL/TLS) üzerinden iletilmekte ve güvenli sunucularda saklanmaktadır.

İLETİŞİM

Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
E-posta: info@kahramanlardernegi.org
Telefon: +90 (212) 555 0000
Adres: Atatürk Mahallesi, Cumhuriyet Caddesi No:123, Kadıköy/İstanbul`,
    },
  })
  console.log('✅ Gizlilik Politikası oluşturuldu')

  const kvkkPage = await prisma.legalPage.upsert({
    where: { page: 'kvkk' },
    update: {},
    create: {
      page: 'kvkk',
      title: 'KVKK Aydınlatma Metni',
      content: `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; veri sorumlusu olarak Ölümsüz Kahramanlar Derneği ("Dernek") tarafından aşağıda açıklanan kapsamda işlenebilecektir.

VERİ SORUMLUSU

Dernek Adı: Ölümsüz Kahramanlar Derneği
Adres: Atatürk Mahallesi, Cumhuriyet Caddesi No:123, Kadıköy/İstanbul
E-posta: kvkk@kahramanlardernegi.org
Telefon: +90 (212) 555 0000

KİŞİSEL VERİLERİN İŞLENME AMACI

Kişisel verileriniz, Derneğimiz tarafından aşağıdaki amaçlarla işlenmektedir:
- Dernek faaliyetlerinin yürütülmesi
- Üyelik işlemlerinin gerçekleştirilmesi
- Bağış ve yardım süreçlerinin yönetilmesi
- İletişim faaliyetlerinin yürütülmesi
- Etkinlik organizasyonlarının gerçekleştirilmesi
- Yasal yükümlülüklerin yerine getirilmesi

İŞLENEN KİŞİSEL VERİ KATEGORİLERİ

- Kimlik Bilgileri: Ad, soyad, T.C. kimlik numarası, doğum tarihi
- İletişim Bilgileri: Telefon numarası, e-posta adresi, adres bilgileri
- Finansal Bilgiler: Banka hesap bilgileri, bağış tutarları
- Görsel ve İşitsel Kayıtlar: Fotoğraf, video kayıtları
- İşlem Güvenliği Bilgileri: IP adresi, çerez kayıtları

KİŞİSEL VERİ SAHİBİNİN HAKLARI

KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
- Kişisel verilerinizin işlenip işlenmediğini öğrenme
- İşlenmişse buna ilişkin bilgi talep etme
- İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme
- Eksik veya yanlış işlenmişse düzeltilmesini isteme
- Verilerin silinmesini veya yok edilmesini talep etme

BAŞVURU YÖNTEMİ

Haklarınızı kullanmak için kvkk@kahramanlardernegi.org adresine başvurabilirsiniz.`,
    },
  })
  console.log('✅ KVKK Aydınlatma Metni oluşturuldu')

  console.log('🎉 Seed işlemi başarıyla tamamlandı!')
}

main()
  .catch((e) => {
    console.error('❌ Seed işlemi sırasında hata:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
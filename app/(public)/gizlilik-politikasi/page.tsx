import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Ölümsüz Kahramanlar Derneği',
  description: 'Ölümsüz Kahramanlar Derneği gizlilik politikası ve kişisel verilerin korunması',
}

async function getPrivacyContent() {
  try {
    const page = await prisma.legalPage.findUnique({
      where: { page: 'privacy' }
    })
    return page
  } catch (error) {
    console.error('Gizlilik politikası yüklenemedi:', error)
    return null
  }
}

export default async function GizlilikPolitikasiPage() {
  const privacyPage = await getPrivacyContent()

  // Eğer database'de içerik yoksa varsayılan içeriği göster
  if (!privacyPage) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Gizlilik Politikası</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 md:space-y-8">
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">1. Giriş</h2>
              <p className="text-sm md:text-base leading-relaxed">
                Ölümsüz Kahramanlar Derneği olarak, kişisel verilerinizin güvenliği bizim için son derece önemlidir. 
                Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde toplanan bilgilerin nasıl kullanıldığını 
                ve korunduğunu açıklamaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">2. Toplanan Bilgiler</h2>
              <p className="text-sm md:text-base leading-relaxed mb-3">
                Web sitemizi kullanırken aşağıdaki bilgiler toplanabilir:
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-2 text-sm md:text-base">
                <li>Ad, soyad ve iletişim bilgileri (e-posta, telefon)</li>
                <li>İletişim formları aracılığıyla gönderilen mesajlar</li>
                <li>Bağış yapanların kimlik ve ödeme bilgileri</li>
                <li>Web sitesi kullanım verileri (IP adresi, tarayıcı bilgisi, ziyaret edilen sayfalar)</li>
                <li>Çerez (cookie) verileri</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">3. Bilgilerin Kullanım Amacı</h2>
              <p className="text-sm md:text-base leading-relaxed mb-3">
                Toplanan kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-2 text-sm md:text-base">
                <li>İletişim taleplerini yanıtlamak</li>
                <li>Bağış işlemlerini gerçekleştirmek ve kayıt altına almak</li>
                <li>Dernek faaliyetleri hakkında bilgilendirme yapmak</li>
                <li>Web sitesi performansını iyileştirmek</li>
                <li>Yasal yükümlülükleri yerine getirmek</li>
                <li>Etkinlik ve duyuru bildirimlerini göndermek</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">4. Bilgilerin Paylaşımı</h2>
              <p className="text-sm md:text-base leading-relaxed">
                Kişisel verileriniz, yasal zorunluluklar dışında üçüncü şahıslarla paylaşılmamaktadır. 
                Bağış işlemleri için güvenli ödeme sistemleri kullanılmakta ve bu sistemler kendi gizlilik 
                politikalarına tabidir.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">5. Veri Güvenliği</h2>
              <p className="text-sm md:text-base leading-relaxed">
                Kişisel verilerinizin güvenliğini sağlamak için teknik ve idari önlemler alınmaktadır. 
                Veriler şifreli bağlantılar (SSL/TLS) üzerinden iletilmekte ve güvenli sunucularda saklanmaktadır. 
                Yetkisiz erişim, kayıp veya ifşaya karşı koruma sağlanmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">6. Çerezler (Cookies)</h2>
              <p className="text-sm md:text-base leading-relaxed mb-3">
                Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. Çerezler aşağıdaki 
                amaçlarla kullanılır:
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-2 text-sm md:text-base">
                <li>Oturum yönetimi</li>
                <li>Kullanıcı tercihlerini hatırlama</li>
                <li>Web sitesi trafiğini analiz etme</li>
                <li>Güvenlik önlemleri</li>
              </ul>
              <p className="text-sm md:text-base leading-relaxed mt-3">
                Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda bazı site 
                özellikleri düzgün çalışmayabilir.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">7. Kullanıcı Hakları</h2>
              <p className="text-sm md:text-base leading-relaxed mb-3">
                KVKK kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-2 text-sm md:text-base">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                <li>Verilerin silinmesini veya yok edilmesini talep etme</li>
                <li>İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi nedeniyle 
                    aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">8. Veri Saklama Süresi</h2>
              <p className="text-sm md:text-base leading-relaxed">
                Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve yasal saklama yükümlülükleri 
                çerçevesinde saklanmaktadır. Amacın ortadan kalkması veya yasal saklama süresinin dolması 
                durumunda veriler silinmekte, yok edilmekte veya anonim hale getirilmektedir.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">9. Değişiklikler</h2>
              <p className="text-sm md:text-base leading-relaxed">
                Bu gizlilik politikası, yasal düzenlemeler veya dernek politikalarındaki değişiklikler 
                doğrultusunda güncellenebilir. Önemli değişiklikler web sitemizde duyurulacaktır.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">10. İletişim</h2>
              <p className="text-sm md:text-base leading-relaxed">
                Gizlilik politikamız veya kişisel verilerinizin işlenmesi hakkında sorularınız için 
                bizimle iletişime geçebilirsiniz:
              </p>
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg mt-4">
                <p className="text-sm md:text-base"><strong>E-posta:</strong> info@kahramanlardernegi.org</p>
                <p className="text-sm md:text-base"><strong>Telefon:</strong> +90 (212) 555 0000</p>
                <p className="text-sm md:text-base"><strong>Adres:</strong> Atatürk Mahallesi, Cumhuriyet Caddesi No:123, Kadıköy/İstanbul</p>
              </div>
            </section>

            <section className="bg-blue-50 p-4 md:p-6 rounded-lg">
              <p className="text-xs md:text-sm text-gray-600">
                <strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </section>
          </div>
        </div>
      </div>
    )
  }

  // Database'den gelen içeriği göster
  const paragraphs = privacyPage.content.split('\n\n').filter((p: string) => p.trim())

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">{privacyPage.title}</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 md:space-y-8">
          {paragraphs.map((paragraph: string, index: number) => (
            <p key={index} className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {paragraph}
            </p>
          ))}

          <section className="bg-blue-50 p-4 md:p-6 rounded-lg mt-8">
            <p className="text-xs md:text-sm text-gray-600">
              <strong>Son Güncelleme:</strong> {new Date(privacyPage.updatedAt).toLocaleDateString('tr-TR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
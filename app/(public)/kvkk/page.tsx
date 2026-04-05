import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Ölümsüz Kahramanlar Derneği',
  description: 'Ölümsüz Kahramanlar Derneği KVKK aydınlatma metni ve kişisel verilerin korunması',
}

async function getKVKKContent() {
  try {
    const page = await prisma.legalPage.findUnique({
      where: { page: 'kvkk' }
    })
    return page
  } catch (error) {
    console.error('KVKK metni yüklenemedi:', error)
    return null
  }
}

export default async function KVKKPage() {
  const kvkkPage = await getKVKKContent()

  // Eğer database'de içerik yoksa varsayılan içeriği göster
  if (!kvkkPage) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
            Kişisel Verilerin Korunması ve İşlenmesi Hakkında Aydınlatma Metni
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 md:space-y-8">
            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">1. Veri Sorumlusu</h2>
              <p className="text-sm md:text-base leading-relaxed">
                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; 
                veri sorumlusu olarak Ölümsüz Kahramanlar Derneği ("Dernek") tarafından aşağıda açıklanan 
                kapsamda işlenebilecektir.
              </p>
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg mt-4">
                <p className="text-sm md:text-base"><strong>Dernek Adı:</strong> Ölümsüz Kahramanlar Derneği</p>
                <p className="text-sm md:text-base"><strong>Adres:</strong> Atatürk Mahallesi, Cumhuriyet Caddesi No:123, Kadıköy/İstanbul</p>
                <p className="text-sm md:text-base"><strong>E-posta:</strong> kvkk@kahramanlardernegi.org</p>
                <p className="text-sm md:text-base"><strong>Telefon:</strong> +90 (212) 555 0000</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">2. Kişisel Verilerin İşlenme Amacı</h2>
              <p className="text-sm md:text-base leading-relaxed mb-3">
                Kişisel verileriniz, Derneğimiz tarafından aşağıdaki amaçlarla işlenmektedir:
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-2 text-sm md:text-base">
                <li>Dernek faaliyetlerinin yürütülmesi</li>
                <li>Üyelik işlemlerinin gerçekleştirilmesi</li>
                <li>Bağış ve yardım süreçlerinin yönetilmesi</li>
                <li>İletişim faaliyetlerinin yürütülmesi</li>
                <li>Etkinlik organizasyonlarının gerçekleştirilmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Finans ve muhasebe işlemlerinin yürütülmesi</li>
                <li>Bilgi güvenliği süreçlerinin yürütülmesi</li>
                <li>Hukuki işlemlerin takibi</li>
                <li>İstatistiksel analiz ve raporlama</li>
              </ul>
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
  const paragraphs = kvkkPage.content.split('\n\n').filter((p: string) => p.trim())

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">{kvkkPage.title}</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 md:space-y-8">
          {paragraphs.map((paragraph: string, index: number) => (
            <p key={index} className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {paragraph}
            </p>
          ))}

          <section className="bg-blue-50 p-4 md:p-6 rounded-lg mt-8">
            <p className="text-xs md:text-sm text-gray-600">
              <strong>Son Güncelleme:</strong> {new Date(kvkkPage.updatedAt).toLocaleDateString('tr-TR', { 
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
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Users, Heart, Award, ArrowRight, MapPin, Clock } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { HeroSection } from './hero-section'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getHomeData() {
  try {
    const [news, events, projects, heroSections, aboutContent, settings, stats] = await Promise.all([
      prisma.news.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' },
        take: 3,
        include: { category: true },
      }),
      prisma.event.findMany({
        where: { isPublished: true, eventDate: { gte: new Date() } },
        orderBy: { eventDate: 'asc' },
        take: 3,
      }),
      prisma.project.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      }),
      prisma.heroSection.findFirst({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      }),
      prisma.pageContent.findFirst({ where: { page: 'about' } }),
      prisma.siteSettings.findFirst(),
      Promise.all([
        prisma.news.count({ where: { isPublished: true } }),
        prisma.event.count({ where: { isPublished: true } }),
        prisma.project.count({ where: { isPublished: true } }),
        prisma.boardMember.count({ where: { isPublished: true } }),
      ]),
    ])

    return {
      news,
      events,
      projects,
      heroImages: (heroSections as any)?.images || [],
      aboutContent: aboutContent || null,
      logo: settings?.logo || null,
      disabledPages: settings?.disabledPages || [],
      stats: { news: stats[0], events: stats[1], projects: stats[2], members: stats[3] },
    }
  } catch (error) {
    console.error('Home data fetch error:', error)
    return {
      news: [],
      events: [],
      projects: [],
      heroImages: [],
      aboutContent: null,
      logo: null,
      disabledPages: [],
      stats: { news: 0, events: 0, projects: 0, members: 0 },
    }
  }
}

export default async function HomePage() {
  const data = await getHomeData()

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="hero-gradient text-white min-h-[88vh] flex items-center relative overflow-hidden">
        <HeroSection images={data.heroImages} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
        <div className="container-custom relative z-20 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
              Kahramanlarımızı
              <span className="text-amber-300"> Yaşatıyoruz</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/85 max-w-2xl leading-relaxed">
              Vatanımız için canlarını feda eden kahramanlarımızın hatıralarını yaşatıyor,
              ailelerine destek oluyor ve gelecek nesillere bu değerleri aktarıyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/hakkimizda"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold bg-white text-blue-900 hover:bg-amber-50 rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Bizi Tanıyın <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="/bagis"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold border-2 border-white/70 text-white hover:bg-white hover:text-blue-900 rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
              >
                <Heart className="h-5 w-5" /> Bağış Yapın
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 z-30">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {!data.disabledPages.includes('yonetim') && (
              <Link href="/yonetim" className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4 border border-gray-100 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">{data.stats.members}+</div>
                  <div className="text-xs text-gray-500 font-medium">Yönetim Kurulu Üyesi</div>
                </div>
              </Link>
            )}
            {!data.disabledPages.includes('faaliyetler') && (
              <Link href="/faaliyetler" className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4 border border-gray-100 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">{data.stats.projects}+</div>
                  <div className="text-xs text-gray-500 font-medium">Aktif Proje</div>
                </div>
              </Link>
            )}
            {!data.disabledPages.includes('etkinlikler') && (
              <Link href="/etkinlikler" className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4 border border-gray-100 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">{data.stats.events}+</div>
                  <div className="text-xs text-gray-500 font-medium">Etkinlik</div>
                </div>
              </Link>
            )}
            {!data.disabledPages.includes('bagis') && (
              <Link href="/bagis" className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4 border border-gray-100 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">500+</div>
                  <div className="text-xs text-gray-500 font-medium">Desteklenen Aile</div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl">
            <div>
              <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 rounded-full">
                Hakkımızda
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                {data.aboutContent?.title || 'Ölümsüz Kahramanlar Derneği'}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-8 line-clamp-5">
                {data.aboutContent?.content ||
                  'Derneğimiz, vatanımız için canlarını feda eden kahramanlarımızın hatıralarını yaşatmak, ailelerine destek olmak ve gelecek nesillere bu değerleri aktarmak amacıyla kurulmuştur.'}
              </p>
              <Link
                href="/hakkimizda"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
              >
                Daha Fazla Bilgi <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase text-emerald-600 bg-emerald-50 rounded-full">
              Faaliyetler
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Faaliyetlerimiz</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Şehit ve gazi ailelerine destek olmak için yürüttüğümüz projeler
            </p>
          </div>
          {data.projects.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-7">
                {data.projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/faaliyetler/${project.slug}`}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col hover:-translate-y-1"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-blue-500/10 overflow-hidden">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Award className="h-16 w-16 text-primary/20" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary rounded-full shadow">
                        {project.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-3 flex-1">
                        {project.summary || project.description.substring(0, 130)}
                      </p>
                      <div className="mt-4 flex items-center text-primary font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                        Detayları Gör <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  href="/faaliyetler"
                  className="inline-flex items-center gap-2 px-7 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
                >
                  Tüm Faaliyetler <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center py-12 text-gray-400">Henüz faaliyet eklenmemiş.</p>
          )}
        </div>
      </section>

      {/* News */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 rounded-full">
              Haberler
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Son Haberler</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Derneğimizden güncel haberler ve duyurular</p>
          </div>
          {data.news.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-7">
                {data.news.map((item) => (
                  <Link
                    key={item.id}
                    href={`/haberler/${item.slug}`}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col hover:-translate-y-1"
                  >
                    <div className="relative h-52 bg-gray-100 overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                          <Calendar className="h-16 w-16 text-blue-200" />
                        </div>
                      )}
                      {item.category && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-blue-700 rounded-full shadow">
                          {item.category.name}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(item.publishedAt || item.createdAt)}
                      </div>
                      <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-3 flex-1">
                        {item.summary || item.content.substring(0, 120)}
                      </p>
                      <div className="mt-4 flex items-center text-primary font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                        Devamını Oku <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  href="/haberler"
                  className="inline-flex items-center gap-2 px-7 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
                >
                  Tüm Haberler <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center py-12 text-gray-400">Henüz haber eklenmemiş.</p>
          )}
        </div>
      </section>

      {/* Events */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase text-violet-600 bg-violet-50 rounded-full">
              Etkinlikler
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Yaklaşan Etkinlikler</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Katılabileceğiniz etkinliklerimiz</p>
          </div>
          {data.events.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-7">
                {data.events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/etkinlikler/${event.slug}`}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col hover:-translate-y-1"
                  >
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-100 flex items-center justify-center">
                          <Calendar className="h-16 w-16 text-violet-200" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                        <div className="flex items-center gap-1.5 text-white text-xs font-semibold">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(event.eventDate)}
                          {event.eventTime && (
                            <><Clock className="h-3.5 w-3.5 ml-2" />{event.eventTime}</>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      {event.location && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                          <MapPin className="h-3.5 w-3.5" />
                          {event.location}
                        </div>
                      )}
                      <p className="text-gray-500 text-sm line-clamp-2 flex-1">
                        {event.description.substring(0, 110)}
                      </p>
                      <div className="mt-4 flex items-center text-primary font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                        Detayları Gör <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  href="/etkinlikler"
                  className="inline-flex items-center gap-2 px-7 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
                >
                  Tüm Etkinlikler <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center py-12 text-gray-400">Yaklaşan etkinlik bulunmuyor.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-primary to-indigo-800" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="container-custom relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Bize Katılın,{' '}
            <span className="text-amber-300">Fark Yaratın</span>
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/80 leading-relaxed">
            Kahramanlarımızın hatıralarını yaşatmak ve ailelerine destek olmak için sizin de
            katkınıza ihtiyacımız var.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/bagis"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold bg-amber-400 text-gray-900 hover:bg-amber-300 rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <Heart className="h-5 w-5" /> Bağış Yap
            </a>
            <a
              href="/iletisim"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold border-2 border-white/60 text-white hover:bg-white hover:text-blue-900 rounded-xl transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <Users className="h-5 w-5" /> Gönüllü Ol
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

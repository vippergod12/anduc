import { getCategories, getFeaturedProjects, home, services } from '@/lib/data'
import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'
import Story from '@/components/home/Story'
import Audience from '@/components/home/Audience'
import Services from '@/components/home/Services'
import FocusAreas from '@/components/home/FocusAreas'
import Process from '@/components/home/Process'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import CtaBlock from '@/components/CtaBlock'

// Nội dung trang chủ: data/home.json (+ services.json, categories.json, projects.json, site.json → cta)
export default function HomePage() {
  return (
    <>
      <Hero data={home.hero} />
      <Marquee items={home.marquee} />
      <Story data={home.about} />
      <Audience data={home.audience} />
      <Services data={home.services} groups={services.groups} />
      <FocusAreas data={home.focus} categories={getCategories()} />
      <Process data={home.process} />
      <FeaturedProjects data={home.featured} projects={getFeaturedProjects(home.featured.limit)} />
      <CtaBlock />
    </>
  )
}

import { getCategories, getFeaturedProjects, getHeroProjects, home } from '@/lib/data'
import Hero from '@/components/home/Hero'
import Marquee from '@/components/home/Marquee'
import Services from '@/components/home/Services'
import CategoriesBento from '@/components/home/CategoriesBento'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Process from '@/components/home/Process'
import Story from '@/components/home/Story'
import Testimonials from '@/components/home/Testimonials'
import BigCTA from '@/components/home/BigCTA'

// Nội dung trang chủ: data/home.json (+ categories.json, projects.json)
export default function HomePage() {
  return (
    <>
      <Hero data={home.hero} hero={getHeroProjects(1)} />
      <Marquee items={home.marquee} />
      <Services data={home.services} />
      <CategoriesBento data={home.categories} categories={getCategories()} />
      <FeaturedProjects data={home.featured} projects={getFeaturedProjects(home.featured.limit)} />
      <Story data={home.story} />
      <Process data={home.process} />
      <Testimonials data={home.testimonials} />
      <BigCTA data={home.cta} />
    </>
  )
}

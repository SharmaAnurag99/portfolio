import { getPayload } from 'payload'
import configPromise from '../../payload.config'
import { resolveMediaUrlIndexed } from '@/lib/media'
import { useCmsContent } from '@/lib/use-cms-content'
import { localPortfolioProjects } from '@/data/local/portfolio'
import { slugify } from '@/lib/slugify'
import ProjectsReelClient, { ReelProject } from './ProjectsReelClient'

const ProjectsReel = async () => {
  const cmsEnabled = useCmsContent()

  const rawDocs = cmsEnabled
    ? (
        await (await getPayload({ config: configPromise })).find({
          collection: 'projects',
          depth: 1,
          limit: 6,
          sort: '-createdAt',
        })
      ).docs
    : localPortfolioProjects

  const projects: ReelProject[] = rawDocs.map((p: any, i: number) => {
    const imageUrl = cmsEnabled ? resolveMediaUrlIndexed(p.image, i) : p.image
    const title: string = p.title || 'Untitled'
    const slug: string = (p.slug && String(p.slug).trim()) || slugify(title)
    const outcome: string =
      p.outcome ||
      (typeof p.content === 'string'
        ? p.content.split('. ')[0].slice(0, 120)
        : '')

    return {
      slug,
      title,
      category: String(p.category || '').toUpperCase(),
      outcome,
      image: imageUrl || '/placeholder.svg',
      year: p.year || '',
    }
  })

  if (projects.length === 0) return null

  return <ProjectsReelClient projects={projects} />
}

export default ProjectsReel

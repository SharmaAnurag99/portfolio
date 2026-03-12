# Payload CMS Integration Guide: Frontend Migration

This guide demonstrates the difference between the hardcoded (static) approach and the dynamic (Payload CMS) approach for four key React components.

## 1. Testimonials

### Before (Static Array)
```tsx
const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e...',
    quote: 'Absolutely ecstatic with the results!...',
    name: 'LK Sharma',
    role: 'AstroScientist',
  },
  // ... more items
];

const Testimonials = () => {
  return (
    // ... JSX mapping over `testimonials`
  )
}
```

### After (Payload Server Component)
**Key Changes:**
1. Component becomes `async` (`const Testimonials = async () =>`).
2. Opt out of Next.js static cache with `export const dynamic = 'force-dynamic'`.
3. Fetch data via standard Local API `payload.find()`.
4. Access `image` URL safely (Payload resolves relations as complete objects when `depth: 1` is used).

```tsx
export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import configPromise from '../../payload.config'

const Testimonials = async () => {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit: 100
  })

  const testimonials = data.docs

  return (
    // ...
    {testimonials.map((testimonial, index) => {
      // Safely access the image field
      const imageUrl = typeof testimonial.image === 'object' && testimonial.image !== null 
            ? testimonial.image.url 
            : testimonial.image
            
      return (
          <img src={imageUrl} alt={testimonial.name} />
          <p>{testimonial.content}</p> {/* Changed from quote to content */}
      )
    })}
    // ...
  )
}
```

---

## 2. Skills

### Before (Static Grouped Array)
```tsx
const skills = [
    {
        category: "Technical Skills",
        items: ["JavaScript", "TypeScript", "Python", "ReactJS", "Next.js"]
    },
    // ... more items
];

const Skills = () => {
    // Nested map converting categories into individual blocks
}
```

### After (Payload Flat Collection)
**Key Changes:**
Instead of category objects storing multiple strings, the Payload schema uses individual `Skill` documents that have names and optional icons.

```tsx
export const dynamic = 'force-dynamic'
import { getPayload } from 'payload'
import configPromise from '../../payload.config'

const Skills = async () => {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.find({
        collection: 'skills',
        limit: 100,
    })
    
    const skills = data.docs;
    
    return (
        // ... Render a single grid of unified skill tags
        <div className="flex flex-wrap gap-3 mt-4">
            {skills.map((skill, idx) => {
                const imageUrl = typeof skill.image === 'object' && skill.image !== null ? skill.image.url : null;
                return (
                    <span>
                        {imageUrl && <img src={imageUrl} />}
                        {skill.name}
                    </span>
                 )
             })}
         </div>
         // ...
    )
}
```

---

## 3. Experience (Timeline)

### Before (Static Array)
```tsx
const experiences = [
    {
        role: "Founding Developer",
        company: "QodeML Labs",
        period: "September 2024 – Present",
        description: "Co-founded and led development..."
    },
    // ...
]
```

### After (Payload Abstract Schema)
**Key Changes:**
Because Payload came pre-configured with a generic `education` schema containing only a `title` and a `content` rich-text field, we mapped the complex timeline structure into these basic fields in the CMS, and then split them open on the frontend using string manipulation (`.split('\n\n')`).

```tsx
export const dynamic = 'force-dynamic'
import { getPayload } from 'payload'
import configPromise from '../../payload.config'

const Experience = async () => {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.find({
        collection: 'education',
        limit: 100,
    })
    
    const experiences = data.docs;

    return (
        // ... 
        {experiences.map((exp: any, index: number) => {
            // Recover original fields
            const [role, ...companyParts] = (exp.title || '').split(' at ');
            const company = companyParts.join(' at ');
            
            const contentParts = (exp.content || '').split('\n\n');
            const period = contentParts[contentParts.length - 1];
            const description = contentParts.slice(0, -1).join('\n\n');

            return (
                // Render timeline with rebuilt standard object
            )
        })}
        // ...
    )
}
```

---

## 4. Work Portfolio (Projects)

### Before (Static Arrays, varying per file)
```tsx
const web2Projects = [
    {
        image: '/rekhaaji.png',
        title: 'AstroRekhaaji',
        description: 'Production service platform built with Next.js...',
        tags: ['Next.js', 'Tailwind', 'Cloudflare D1'],
        link: 'https://astrorekhaaji.com'
    },
]
```

### After (Payload Dynamic Collection)
**Key Changes:**
Moved all web2, web3, and featured projects into ONE database collection (`projects`). We then filter that collection on specific pages. We process `tags` via an array block mapping.

```tsx
export const dynamic = 'force-dynamic';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config'; // Or whichever relative path

const Web2Projects = async () => {
    const payload = await getPayload({ config: configPromise });
    
    // Notice the Filter applied directly to the query!
    const data = await payload.find({
        collection: 'projects',
        where: { category: { equals: 'WEB DEVELOPMENT' } },
        depth: 1,
        limit: 100
    });
    
    const web2Projects = data.docs;

    return (
        // ... 
        {web2Projects.map((project: any, index: number) => {
            const imageUrl = typeof project.image === 'object' && project.image !== null ? project.image.url : ''
            const targetUrl = project.url || '#'
            
            return (
                // ... Render Project Card ...
                <p>{project.content}</p> {/* Original description fetched via content */}
                <div>
                   {/* Payload saves array objects with sub-fields, so we map the internal string */}
                   {project.tags?.map((tagObj: any, i: number) => (
                       <span>{tagObj.tag}</span>
                   ))}
                </div>
            )
        })}
    )
}
```

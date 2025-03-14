interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative z-10 py-16 md:py-24 bg-black/60">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        {description && <p className="text-xl text-gray-300 max-w-2xl mx-auto">{description}</p>}
      </div>
    </div>
  )
}


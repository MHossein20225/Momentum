export function ProjectItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600">
      <span
        aria-hidden="true"
        className="size-2 shrink-0 rounded-full bg-violet-500"
      />
      <span className="truncate">{name}</span>
    </div>
  )
}

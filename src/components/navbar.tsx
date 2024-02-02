import Link from "next/link"

const Navbar = () => {
  return (
    <div className="relative">
      <header className="z-10 border-b py-4 bg-background/50 fixed top-0 w-full backdrop-blur-md">
        <div className="flex gap-10 container items-center justify-between">
          <div className="text-lg font-semibold leading-none cursor-default">Ambisius <br />
            <span className="text-sm text-muted-foreground pl-10">Challenge</span>
          </div>
          <ul>
            <li>
              <Link href={'/'} className="font-medium hover:opacity-80 transition-all">Home</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export { Navbar }
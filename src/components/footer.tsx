const Footer = () => {
  return (
    <footer className="border-t mt-10 ">
      <div className="container py-10">
        <h4 className="text-muted-foreground text-sm mb-4">By Abdurrohim Syahruromadhon Wahyudi</h4>
        <p className="text-muted-foreground text-sm">The source code is available on {' '}
          <a 
            href='https://github.com/SyahrulRmd/957ca985-cd93-4fb8-b8de-7c9997366359' 
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-all"
          >
            Github
          </a>
        </p>
      </div>
    </footer>
  )
}

export { Footer }

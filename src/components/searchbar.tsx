'use client'

import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter, useSearchParams } from "next/navigation";

const Searchbar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState<string>(searchParams.get('q') ?? '')
  const searchQuery = useDebounce(search, 500)

  useEffect(() => {
    if (searchQuery) {
      router.push('/search?q=' + searchQuery)
    } else {
      router.push('/')
    }
  }, [router, searchParams, searchQuery])

  return (
    <div className="relative flex items-center">
      <div className="absolute pl-3">
        <Search size={18} />
      </div>
      <Input
        placeholder='Search post title...'
        className="pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        data-test-id='search-bar'
      />
    </div>
  )
}

export { Searchbar } 

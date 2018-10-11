import Home from '@/components/home/Home'
import Read from '@/components/read/Read'
import Music from '@/components/music/Music'
import Book from '@/components/book/Book'
import Forum from '@/components/forum/Forum'
import Movie from '@/components/movie/Movie'
import Event from '@/components/event/Event'
import BookTag from '@/components/book/BookTag'
import BookList from '@/components/book/BookList'

export const routes = [
  {path: '/', component: Home},
  {path: '/read', component: Read},
  {path: '/music', component: Music},
  {path: '/book', component: Book},
  {path: '/event', component: Event},
  {path: '/movie', component: Movie},
  {path: '/forum', component: Forum},
  {path: '/book/tag', component: BookTag},
  {path: '/book/tag/:tag_id', component: BookList}
]

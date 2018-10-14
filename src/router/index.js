import Home from '@/components/home/Home'
import Read from '@/components/read/Read'
import Music from '@/components/music/Music'
import Book from '@/components/book/Book'
import Forum from '@/components/forum/Forum'
import Movie from '@/components/movie/Movie'
import Event from '@/components/event/Event'
import BookTag from '@/components/book/BookTag'
import BookList from '@/components/book/BookList'
import BookDetail from '@/components/book/BookDetail'
import Post from '@/components/forum/Post'
import GoNode from '@/components/forum/GoNode'
import Node from '@/components/forum/Node'

export const routes = [
  {path: '/', component: Home},
  {path: '/read', component: Read},
  {path: '/music', component: Music},
  {path: '/book', component: Book},
  {path: '/event', component: Event},
  {path: '/movie', component: Movie},
  {path: '/book/tag', component: BookTag},
  {path: '/book/tag/:tag_id', component: BookList},
  {path: '/book/subject/:id', component: BookDetail},
  {path: '/forum', component: Forum},
  {path: '/forum/:id', component: Post},
  {path: '/forum/node/:id', component: GoNode},
  {path: '/forum/go/node', component: Node}
]

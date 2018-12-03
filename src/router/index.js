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
import BookTOP250 from '@/components/book/BookTOP250'
import Post from '@/components/forum/Post'
import GoNode from '@/components/forum/GoNode'
import Node from '@/components/forum/Node'
import MovieDetail from '@/components/movie/MovieDetail'
import MovieList from '@/components/movie/MovieList'
import MovieTOP250 from '@/components/movie/MovieTOP250'
import Note from '@/components/note/Note'
import NoteDetail from '@/components/note/NoteDetail'
import About from '@/components/About'
import SearchResult from '@/components/SearchResult'
import Register from '@/components/user/Register'
import Login from '@/components/user/Login'

import Test from '@/components/Test'

export const routes = [
  {path: '/', component: Home},
  {path: '/read', component: Read},
  {path: '/music', component: Music},
  {path: '/event', component: Event},
  /* movie */
  {path: '/movie', component: Movie},
  {path: '/movie/tag', component: MovieList},
  {path: '/movie/subject/:id', component: MovieDetail},
  {path: '/movie/top250', component: MovieTOP250},
  /* book */
  {path: '/book', component: Book},
  {path: '/book/tag', component: BookTag},
  {path: '/book/tag/:tag_id', component: BookList},
  {path: '/book/subject/:id', component: BookDetail},
  {path: '/book/top250', component: BookTOP250},
  /* forum */
  {path: '/forum', component: Forum},
  {path: '/forum/:id', component: Post},
  {path: '/forum/node/:id', component: GoNode},
  {path: '/forum/go/node', component: Node},
  /* note */
  {path: '/note', component: Note},
  {path: '/note/subject/:id', component: NoteDetail},
  /* about */
  {path: '/about', component: About},
  /* search */
  {path: '/search', component: SearchResult},
  /* user */
  {path: '/register', component: Register},
  {path: '/login', component: Login},
  /* test */
  {path: '/test', component: Test}
]

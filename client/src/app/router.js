import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Root from "../components/Root";
import HomePage from "../pages/HomePage";
import EventsPage from "../pages/events/EventsPage";
import UsersPage from "../pages/marshals/UsersPage";
import BlogsPage from "../pages/blogs/BlogsPage";
import PostersPage from "../pages/posters/PostersPage";
import VideosPage from "../pages/videos/VideosPage";
import CoursesPage from "../pages/courses/CoursesPage";
import KnowPage from "../pages/know/KnowPage";
import AboutPage from "../pages/know/AboutPage";
import ContactPage from "../pages/know/ContactPage";
import AuthPage from "../pages/auth/AuthPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import DonationsPage from "../pages/donations/DonationsPage";
import Dashboard from "../pages/dashboard/Dashboard";
import DashPosters from "../pages/dashboard/posters/DashPosters";
import DashProfile from "../pages/dashboard/profile/DashProfile";
import DashOverview from "../pages/dashboard/DashOverview";
import DashPostersLayout from "../pages/dashboard/posters/DashPostersLayout";
import AddPoster from "../pages/dashboard/posters/AddPoster";
import DashViewPoster from "../pages/dashboard/posters/DashViewPoster";
import UpdatePoster from "../pages/dashboard/posters/UpdatePoster";
import UpdatePosterLayout from "../pages/dashboard/posters/UpdatePosterLayout";
import ProfileLayout from "../pages/dashboard/profile/ProfileLayout";
import UpdateProfile from "../pages/dashboard/profile/UpdateProfile";
import DashVideosLayout from "../pages/dashboard/videos/DashVideosLayout";
import AddVideo from "../pages/dashboard/videos/AddVideo";
import DashViewVideo from "../pages/dashboard/videos/DashViewVideo";
import UpdateVideoLayout from "../pages/dashboard/videos/UpdateVideoLayout";
import UpdateVideo from "../pages/dashboard/videos/UpdateVideo";
import DashVideos from "../pages/dashboard/videos/DashVideos";
import DashEventsLayout from "../pages/dashboard/events/DashEventsLayout";
import AddEvent from "../pages/dashboard/events/AddEvent";
import DashViewEvent from "../pages/dashboard/events/DashViewEvent";
import UpdateEventLayout from "../pages/dashboard/events/UpdateEventLayout";
import UpdateEvent from "../pages/dashboard/events/UpdateEvent";
import DashCoursesLayout from "../pages/dashboard/courses/DashCoursesLayout";
import AddCourse from "../pages/dashboard/courses/AddCourse";
import DashViewCourse from "../pages/dashboard/courses/DashViewCourse";
import UpdateCourseLayout from "../pages/dashboard/courses/UpdateCourseLayout";
import UpdateCourse from "../pages/dashboard/courses/UpdateCourse";
import DashBlogsLayout from "../pages/dashboard/blogs/DashBlogsLayout";
import AddBlog from "../pages/dashboard/blogs/AddBlog";
import DashViewBlog from "../pages/dashboard/blogs/DashViewBlog";
import UpdateBlogLayout from "../pages/dashboard/blogs/UpdateBlogLayout";
import UpdateBlog from "../pages/dashboard/blogs/UpdateBlog";
import DashEvents from "../pages/dashboard/events/DashEvents";
import DashCourses from "../pages/dashboard/courses/DashCourses";
import DashBlogs from "../pages/dashboard/blogs/DashBlogs";
import ForgotPage from "../pages/auth/ForgotPage";
import ResetPage from "../pages/auth/ResetPage";
import EventsLayout from "../pages/events/EventsLayout";
import ViewEvent from "../pages/events/ViewEvent";
import CoursesLayout from "../pages/courses/CoursesLayout";
import ViewCourse from "../pages/courses/ViewCourse";
import BlogsLayout from "../pages/blogs/BlogsLayout";
import ViewBlog from "../pages/blogs/ViewBlog";
import VideosLayout from "../pages/videos/VideosLayout";
import ViewVideo from "../pages/videos/ViewVideo";
import PostersLayout from "../pages/posters/PostersLayout";
import ViewPoster from "../pages/posters/ViewPoster";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="events" element={<EventsLayout />}>
          <Route index element={<EventsPage />} />
          <Route path=":id" element={<ViewEvent />} />
        </Route>
        <Route path="marshals" element={<UsersPage />} />
        <Route path="courses" element={<CoursesLayout />}>
          <Route index element={<CoursesPage />} />
          <Route path=":id" element={<ViewCourse />} />
        </Route>
        <Route path="blogs" element={<BlogsLayout />}>
          <Route index element={<BlogsPage />} />
          <Route path=":id" element={<ViewBlog />} />
        </Route>
        <Route path="videos" element={<VideosLayout />}>
          <Route index element={<VideosPage />} />
          <Route path=":id" element={<ViewVideo />} />
        </Route>
        <Route path="posters" element={<PostersLayout />}>
          <Route index element={<PostersPage />} />
          <Route path=":id" element={<ViewPoster />} />
        </Route>
        <Route path="know" element={<KnowPage />}>
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="donate" element={<DonationsPage />} />
      </Route>
      <Route path="auth" element={<AuthPage />}>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot" element={<ForgotPage />} />
        <Route path="reset" element={<ResetPage />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<DashOverview />} />
        <Route path="events" element={<DashEventsLayout />}>
          <Route index element={<DashEvents />} />
          <Route path="add" element={<AddEvent />} />
          <Route path=":id" element={<DashViewEvent />} />
          <Route path="update" element={<UpdateEventLayout />}>
            <Route path=":id" element={<UpdateEvent />} />
          </Route>
        </Route>
        <Route path="courses" element={<DashCoursesLayout />}>
          <Route index element={<DashCourses />} />
          <Route path="add" element={<AddCourse />} />
          <Route path=":id" element={<DashViewCourse />} />
          <Route path="update" element={<UpdateCourseLayout />}>
            <Route path=":id" element={<UpdateCourse />} />
          </Route>
        </Route>
        <Route path="blogs" element={<DashBlogsLayout />}>
          <Route index element={<DashBlogs />} />
          <Route path="add" element={<AddBlog />} />
          <Route path=":id" element={<DashViewBlog />} />
          <Route path="update/" element={<UpdateBlogLayout />}>
            <Route path=":id" element={<UpdateBlog />} />
          </Route>
        </Route>
        <Route path="videos" element={<DashVideosLayout />}>
          <Route index element={<DashVideos />} />
          <Route path="add" element={<AddVideo />} />
          <Route path=":id" element={<DashViewVideo />} />
          <Route path="update" element={<UpdateVideoLayout />}>
            <Route path=":id" element={<UpdateVideo />} />
          </Route>
        </Route>
        <Route path="posters" element={<DashPostersLayout />}>
          <Route index element={<DashPosters />} />
          <Route path="add" element={<AddPoster />} />
          <Route path=":id" element={<DashViewPoster />} />
          <Route path="update" element={<UpdatePosterLayout />}>
            <Route path=":id" element={<UpdatePoster />} />
          </Route>
        </Route>
        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<DashProfile />} />
          <Route path="update" element={<UpdateProfile />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

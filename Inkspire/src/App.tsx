// import { Link } from "react-router";
import "./App.css";
import { Button } from "flowbite-react";
import { Carousel } from "flowbite-react";
import { Footer } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import supabase from "./config/supabaseClient";

function App() {
  const [fetchError, setFetchError] = useState(null);
  const [blogPost, setblogPost] = useState(null);

  console.log(supabase);

  return (
    <>
      <div className="md:mt-2 max-w-[1280px] mx-auto px-8 text-center">
        {/* Hero Section with Big Header */}
        <header className="container py-16 text-center">
          <p className="font-semibold md:mb-4">The Team</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Unleash Your Voice: Share, Inspire, and Connect
          </h1>
          <div className="flex flex-col items-center justify-center md:mt-5 space-y-4">
            <p className="text-xl text-muted-foreground">
              Turn your ideas into impactful stories and reach readers
              worldwide. Your journey starts here.
            </p>
            <Link to="createBlog">
              <Button className="bg-gray-900 hover:bg-gray-100" size="sm">
                Start Writing
              </Button>
            </Link>
          </div>
        </header>
        {/* Carousel Section with image  */}
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel slideInterval={5000}>
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
              alt="..."
            />
          </Carousel>
        </div>
        {/* Blog Posts Section */}
        <section className="container py-16">
          <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((post) => (
              <article
                key={post}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={`/placeholder.svg?height=200&width=400&text=Post+${post}`}
                  alt={`Blog post ${post}`}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Blog Post Title {post}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    This is a brief excerpt from the blog post. It gives readers
                    a quick overview of what the article is about...
                  </p>
                  <Button color="light">Read More</Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Footer container>
          <div className="w-full text-center">
            <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Ink<span className="text-blue-600">spire</span>
              </span>
              <Footer.LinkGroup className="gap-7">
                <Link className="text-gray-600" to="">
                  About
                </Link>
                <Link className="text-gray-600" to="">
                  Privacy Policy
                </Link>
                <Link className="text-gray-600" to="">
                  Licensing
                </Link>
                <Link className="text-gray-600" to="">
                  Contact
                </Link>
              </Footer.LinkGroup>
            </div>
            <Footer.Divider />
            <Footer.Copyright href="#" by="Inkspire™" year={2024} />
          </div>
        </Footer>
      </div>
    </>
  );
}

export default App;

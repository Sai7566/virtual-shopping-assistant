import React from "react";
import Title from "./Title";
import { useTranslation } from "react-i18next";
import { getBlogs } from "../assets/data";

const Blog = () => {
  const { t } = useTranslation(); // Initialize translation function
  const blogs = getBlogs(t); // Get translated blogs

  return (
    <section className="max-padd-container py-16">
      <Title title1={t("Our")} title2={t("Blog")} titleStyles={"pb-10"} paraStyles={"!block"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5"> {/* Two images per row */}
        {blogs.map((blog, index) => (
          <div key={index} className="rounded-3xl border-[11px] border-primary overflow-hidden relative">
            <img src={blog.image} alt="blogImg" className="w-full h-auto object-cover" />
            {/* Overlay */}
            <div className="absolute top-0 left-0 h-full w-full bg-black/25">
              {/* Info */}
              <div className="absolute bottom-4 left-4 text-white text-[15px]">
                <h3 className="font-[600] text-[16px] pr-4 leading-5">
                  {blog.title}
                </h3>
                <h4 className="medium-14 pb-3 pt-1">{blog.category}</h4>
                <button className="btn-light !px-3 !py-0">
                  {t("Continue reading")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;





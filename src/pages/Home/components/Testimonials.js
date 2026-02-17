import profile1 from "../../../assets/images/profile1.jpg";
import profile2 from "../../../assets/images/profile2.jpg";
import profile3 from "../../../assets/images/profile3.jpg";

export const Testimonials = () => {
  return (
    <section className='my-20'>
        <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Express Yourself</h1>    
        <div className="grid mb-8 rounded-lg border border-gray-200 shadow-sm dark:border-gray-900 md:mb-12 md:grid-cols-2">
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-white rounded-t-lg border-b border-gray-200 md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-darkBrown dark:border-gray-900">
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">These books are amazing</h3>
                    <p className="my-4 font-light">If you care for your time, these books will save you so much of it."</p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                    <img className="w-9 h-9 rounded-full object-cover object-center" src={profile1} alt="user" />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                        <div>Ronnie Davis</div>
                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Developer at BigCompany AI</div>
                    </div>
                </figcaption>    
            </figure>
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-white rounded-tr-lg border-b border-gray-200 dark:bg-darkBrown dark:border-gray-900">
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Solid foundation for any project</h3>
                    <p className="my-4 font-light">Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!"</p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                    <img className="w-9 h-9 rounded-full object-cover object-center" src={profile2} alt="user" />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                        <div>Henry Roger</div>
                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Lead designer</div>
                    </div>
                </figcaption>    
            </figure>
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-white rounded-bl-lg border-b border-gray-200 md:border-b-0 md:border-r dark:bg-darkBrown dark:border-gray-900">
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mindblowing workflow</h3>
                    <p className="my-4 font-light">Aesthetically, the well designed components are beautiful and will undoubtedly level up your next application."</p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                    <img className="w-9 h-9 rounded-full object-cover object-center" src={profile3} alt="user" />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                        <div>Linda Johnson</div>
                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Software Engineer</div>
                    </div>
                </figcaption>    
            </figure>
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-white rounded-b-lg border-gray-200 md:rounded-br-lg dark:bg-darkBrown dark:border-gray-900">
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Efficient Collaborating</h3>
                    <p className="my-4 font-light">You have many examples that can be used to create a fast prototype for your team."</p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                    <img className="w-9 h-9 rounded-full object-cover object-center" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=60" alt="user" />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                        <div>Joseph McFall</div>
                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Junior Developer</div>
                    </div>
                </figcaption>    
            </figure>
        </div>
    </section>
  )
}

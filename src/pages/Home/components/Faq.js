import { Accordion } from "./Accordion";

export const Faq = () => {
    const faqs = [
        {
          "id": 1,
          "question": "Why should I use Bookstore?",
          "answer": "Bookstore offers the most comprehensive collection of computer science and programming eBooks with instant digital access. Get the latest editions, competitive pricing, and access your entire library from any device. Our platform provides detailed ratings, reviews, and recommendations to help you find exactly what you need to advance your tech skills and career."
        },
        {
          "id": 2,
          "question": "Can I access my eBook on mobile?",
          "answer": "Yes! All eBooks purchased from Bookstore are accessible on any device including smartphones, tablets, laptops, and desktop computers. Simply log in to your account from any device and access your entire library. Your books are stored in the cloud, so you can read on the go and pick up right where you left off across all your devices."
        },
        {
          "id": 3,
          "question": "Do you offer refunds?",
          "answer": "Yes, we offer a 7-day money-back guarantee on all eBook purchases. If you're not satisfied with your purchase for any reason, contact our support team within 7 days of purchase for a full refund. Please note that refunds are only available for books that haven't been extensively read or downloaded multiple times to prevent abuse of our policy."
        },
        {
          "id": 4,
          "question": "Do you support International payments?",
          "answer": "Absolutely! We accept payments from customers worldwide. Our payment system supports all major credit cards (Visa, Mastercard, American Express), PayPal, and various international payment methods. All transactions are processed securely with industry-standard encryption, and prices are displayed in USD. Currency conversion is handled automatically by your payment provider."
        }
    ];
    
  return (
    <section className="my-10 p-7 border rounded dark:border-slate-700 shadow-sm">        
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-3 underline underline-offset-8">Question in mind?</h1>    
            <div className="" id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-dark text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
              { faqs.map((faq) => (
                <Accordion key={faq.id} faq={faq} /> 
              )) }
            </div>
      </section>
  )
}

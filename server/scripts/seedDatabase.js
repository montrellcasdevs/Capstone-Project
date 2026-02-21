require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('../models/Product');
const User = require('../models/User');
const connectDB = require('../config/db');

const products = [
  {
    id: 10001,
    name: "Spring Starts Here",
    overview: "Learn Java Spring and Spring Boot fundamentals to build secure, production-ready REST APIs and web applications.",
    long_description: "Start your Spring journey with a practical, project-based guide to modern Java backend development. This book covers core Spring concepts including dependency injection and inversion of control, then moves into Spring Boot auto-configuration, REST controller design, request validation, exception handling, and layered architecture. You will build real applications with Spring Data JPA, PostgreSQL integration, pagination, JWT-based authentication, role-based authorization, and API testing with JUnit and MockMvc. Additional chapters cover configuration profiles, logging, Actuator health checks, Docker packaging, and deployment basics. Ideal for beginners and intermediate Java developers who want to build robust, maintainable Spring applications.",
    price: 44,
    poster: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10001.avif",
    rating: 5,
    in_stock: true,
    size: 5,
    best_seller: true
  },
  {
    id: 10002,
    name: "Java Persistence with Spring Data and Hibernate",
    overview: "Build robust data layers in Java using JPA, Hibernate, and Spring Data repositories with clean persistence design.",
    long_description: "This book teaches you how to model and manage persistence in real-world Spring applications. You will learn entity mapping, relationships, inheritance strategies, transaction boundaries, and query optimization using JPA and Hibernate. It covers Spring Data repository patterns, custom queries, pagination, projections, auditing, and effective handling of lazy loading and N+1 issues. Additional chapters explore testing persistence logic, schema migrations, caching strategies, and performance tuning for production workloads. Ideal for Java developers who want to build maintainable, scalable data access layers with Spring Boot.",
    price: 46,
    poster: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10002.avif",
    rating: 5,
    in_stock: true,
    size: 4,
    best_seller: false
  },
  {
    id: 10003,
    name: "API Design Patterns",
    overview: "Design clear, evolvable APIs using proven patterns for resources, versioning, pagination, and error handling.",
    long_description: "API Design Patterns is a practical guide to building reliable and developer-friendly APIs at scale. It covers core design decisions such as URI and resource modeling, request/response contracts, idempotency, filtering and pagination, and consistent status and error semantics. You will learn strategies for versioning and backward compatibility, authentication and authorization boundaries, and documentation-first workflows with OpenAPI. The book also explores operational concerns including rate limiting, observability, deprecation planning, and governance in multi-team environments. Ideal for backend engineers and architects who want APIs that are easy to adopt, maintain, and evolve over time.",
    price: 41,
    poster: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10003.avif",
    rating: 4,
    in_stock: true,
    size: 2,
    best_seller: false
  },
  {
    id: 10004,
    name: "JUnit in Action",
    overview: "Master unit testing in Java with JUnit 5, test design patterns, and practical techniques for reliable code.",
    long_description: "This edition of JUnit in Action takes you from test fundamentals to advanced testing workflows in modern Java applications. Learn how to write expressive test suites with JUnit 5, structure tests using nested classes and parameterized cases, and improve readability with custom assertions and display names. The book covers mocking with Mockito, testing Spring components, integration testing strategies, and maintaining fast feedback loops in CI pipelines. You will also explore test doubles, edge-case analysis, refactoring with confidence, and organizing large test codebases for long-term maintainability.",
    price: 52,
    poster: "https://images.unsplash.com/photo-1595617795501-9661aafda72a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10004.avif",
    rating: 5,
    in_stock: true,
    size: 8,
    best_seller: true
  },
  {
    id: 10005,
    name: "Modern Java in Action",
    overview: "Write expressive, efficient Java with streams, lambdas, and modern language features for real-world applications.",
    long_description: "Modern Java in Action walks you through practical Java techniques that improve clarity, performance, and maintainability. Learn functional programming with lambdas and method references, work effectively with streams and collectors, and model asynchronous workflows using CompletableFuture. The book also covers Optional, date/time APIs, module system concepts, and patterns for clean concurrent programming. With hands-on examples and refactoring guidance, it helps developers move from legacy Java style to modern idiomatic Java used in production systems.",
    price: 48,
    poster: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10005.avif",
    rating: 4,
    in_stock: true,
    size: 3,
    best_seller: false
  },
  {
    id: 10006,
    name: "Good Code, Bad Code",
    overview: "Learn practical coding principles to spot bad patterns early and write cleaner, more maintainable software.",
    long_description: "Good Code, Bad Code focuses on real engineering trade-offs and shows how small design choices affect readability, testability, and long-term maintenance. Through concrete examples, you will learn how to identify code smells, reduce coupling, improve naming and structure, and refactor safely without changing behavior. The book also covers handling complexity, writing code that is easier to test, avoiding brittle abstractions, and making better decisions during code reviews. It is a practical guide for developers who want to produce codebases that teams can understand, evolve, and trust over time.",
    price: 39,
    poster: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10006.avif",
    rating: 5,
    in_stock: true,
    size: 12,
    best_seller: true
  },
  {
    id: 10007,
    name: "Spring Roo in Action",
    overview: "Accelerate Spring application development with Spring Roo scaffolding, rapid CRUD setup, and opinionated project structure.",
    long_description: "Spring Roo in Action demonstrates how to bootstrap enterprise-style Spring applications quickly while keeping generated code understandable and extensible. You will learn how Roo shells and add-ons create domain models, repositories, services, and web layers with minimal boilerplate. The book covers customizing generated artifacts, integrating persistence and validation, securing endpoints, and evolving projects beyond initial scaffolding. It is ideal for teams that want a fast start with Spring-based applications while still preserving maintainable architecture and developer control.",
    price: 37,
    poster: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10007.avif",
    rating: 5,
    in_stock: true,
    size: 3,
    best_seller: false
  },
  {
    id: 10008,
    name: "Pipeline as Code",
    overview: "Design reliable CI/CD workflows using declarative pipeline definitions, version control, and automated quality gates.",
    long_description: "Pipeline as Code is a practical guide to building maintainable delivery pipelines for modern software teams. You will learn how to define build, test, security scan, and deployment stages as code, manage environments safely, and enforce consistent release rules across projects. The book covers reusable pipeline templates, branch-based workflows, artifact management, secret handling, rollback strategies, and progressive delivery patterns. It includes hands-on examples with common tools such as GitHub Actions, Jenkins, and container-based runners, along with guidance on observability, failure recovery, and keeping feedback fast for developers. Ideal for engineers and DevOps practitioners who want predictable, auditable, and scalable delivery automation.",
    price: 42,
    poster: "https://images.unsplash.com/photo-1613490900233-141c5560d75d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10008.avif",
    rating: 5,
    in_stock: true,
    size: 5,
    best_seller: true
  },
  {
    id: 10009,
    name: "Spring Microservices in Action",
    overview: "Build resilient microservices with Spring Boot, service discovery, gateways, security, and distributed observability.",
    long_description: "Spring Microservices in Action provides a practical blueprint for designing and operating distributed systems using the Spring ecosystem. It covers service decomposition, REST communication, centralized configuration, discovery, API gateway routing, circuit breakers, and fault tolerance patterns. You will also learn security propagation, tracing, logging, and metrics across service boundaries, along with deployment strategies for containerized environments. The book focuses on balancing autonomy and consistency so teams can scale microservices without losing reliability.",
    price: 56,
    poster: "https://images.unsplash.com/photo-1624953901718-e24ee7957f9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10009.avif",
    rating: 5,
    in_stock: true,
    size: 6,
    best_seller: false
  },
  {
    id: 10010,
    name: "Linux in Action",
    overview: "Learn practical Linux administration, shell automation, and system troubleshooting for development and production environments.",
    long_description: "Linux in Action teaches you to work confidently with Linux from the command line through real operations tasks. You will cover file systems, processes, permissions, networking, package management, and service control, then move into scripting and automation for repeatable workflows. The book includes monitoring and diagnostics techniques, log analysis, performance checks, and security hardening basics. It is a hands-on guide for developers and DevOps engineers who need reliable Linux skills for everyday engineering work.",
    price: 34,
    poster: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10010.avif",
    rating: 5,
    in_stock: true,
    size: 4,
    best_seller: false
  },
  {
    id: 10011,
    name: "SonarQube in Action",
    overview: "Improve code quality with static analysis, quality gates, security rules, and continuous inspection workflows.",
    long_description: "SonarQube in Action shows how to embed code quality into day-to-day development and CI pipelines. Learn to configure projects, tune quality profiles, interpret rule violations, and use quality gates to prevent regressions before release. The book covers maintainability and reliability metrics, security hotspots, test coverage integration, and handling technical debt across large codebases. It also explains practical rollout strategies for teams so quality checks become actionable rather than noisy.",
    price: 32,
    poster: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10011.avif",
    rating: 5,
    in_stock: true,
    size: 2,
    best_seller: false
  },
  {
    id: 10012,
    name: "Docker in Action",
    overview: "Package and run applications consistently with Docker images, containers, networking, and compose-based workflows.",
    long_description: "Docker in Action explains container fundamentals through practical build-and-run scenarios for modern software delivery. You will learn how to author efficient Dockerfiles, manage multi-stage builds, optimize image size, and handle container networking and storage. The book covers local development setups with Docker Compose, environment configuration, debugging techniques, and secure image practices. It also introduces registry workflows and deployment considerations so teams can move from laptop to production with fewer surprises.",
    price: 36,
    poster: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10012.avif",
    rating: 5,
    in_stock: true,
    size: 3,
    best_seller: false
  },
  {
    id: 10013,
    name: "Microservices Patterns",
    overview: "Apply proven microservice architecture patterns for service boundaries, data consistency, resilience, and operations.",
    long_description: "Microservices Patterns focuses on the hard parts of distributed architecture and offers practical solutions you can apply immediately. It covers decomposition strategies, inter-service communication, API gateway usage, saga-based transactions, and event-driven integration patterns. You will also learn reliability techniques such as retries, timeouts, circuit breakers, and bulkheads, along with observability and deployment concerns. The book helps architects and developers avoid common pitfalls while evolving monoliths into sustainable microservice ecosystems.",
    price: 58,
    poster: "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10013.avif",
    rating: 5,
    in_stock: true,
    size: 9,
    best_seller: false
  },
  {
    id: 10014,
    name: "ASP.NET Core in Action",
    overview: "Build modern web APIs and MVC apps with ASP.NET Core, clean architecture patterns, and production-ready deployment practices.",
    long_description: "ASP.NET Core in Action provides a practical walkthrough of building robust .NET web applications from the ground up. You will learn how to design REST APIs, build MVC and Razor-based interfaces, and structure projects with dependency injection, configuration, and middleware pipelines. The book covers Entity Framework Core, authentication and authorization with Identity and JWT, validation, logging, testing, and background services. It also explores performance tuning, caching, health checks, containerization, and cloud deployment workflows so your applications are secure, scalable, and maintainable in real production environments.",
    price: 49,
    poster: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10014.avif",
    rating: 5,
    in_stock: true,
    size: 5,
    best_seller: true
  },
  {
    id: 10015,
    name: "Building Web APIs ASP.NET Core",
    overview: "Create secure, testable REST APIs with ASP.NET Core using modern design practices and production-ready tooling.",
    long_description: "Building Web APIs ASP.NET Core is a hands-on guide to developing robust HTTP APIs with clear contracts and maintainable architecture. You will learn controller and minimal API approaches, request validation, DTO mapping, authentication and authorization, and consistent error handling. The book covers API versioning, pagination, filtering, OpenAPI documentation, and automated testing for confidence in change. It also includes deployment and observability practices so your APIs remain reliable and easy to operate in production environments.",
    price: 53,
    poster: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=650&q=40",
    image_local: "/assets/images/10015.avif",
    rating: 5,
    in_stock: true,
    size: 7,
    best_seller: false
  }
];

async function seedDatabase() {
    try {
        await connectDB();
        
        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert products
        await Product.insertMany(products);
        console.log('✅ Successfully seeded products to MongoDB Atlas');

        // Ensure guest user exists for frontend Guest Login
        const guestEmail = process.env.GUEST_EMAIL || 'guest@example.com';
        const guestPassword = process.env.GUEST_PASSWORD;
        const guestName = process.env.GUEST_NAME || 'Guest User';

        if (!guestPassword) {
          throw new Error('GUEST_PASSWORD is required to seed the guest user securely.');
        }

        const hashedPassword = await bcrypt.hash(guestPassword, 10);

        await User.findOneAndUpdate(
          { email: guestEmail },
          { name: guestName, email: guestEmail, password: hashedPassword },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log(`✅ Guest user ready: ${guestEmail}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();

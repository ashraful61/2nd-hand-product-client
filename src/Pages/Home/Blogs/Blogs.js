import React from "react";

const Blogs = () => {
  return (
    <div className="p-10 mb-8">
      <h1 className="text-2xl py-3 font-bold">
        What are the different ways to manage a state in a React application? ?{" "}
      </h1>
      <p>
        As your application grows, it helps to be more intentional about how
        your state is organized and how the data flows between your components.
        Redundant or duplicate state is a common source of bugs. In this
        chapter, you’ll learn how to structure your state well, how to keep your
        state update logic maintainable, and how to share state between distant
        components.
      </p>
      <h1 className="text-2xl py-3 font-bold">
        How does prototypical inheritance work?{" "}
      </h1>
      <p>
        In programming, we often want to take something and extend it. For
        instance, we have a user object with its properties and methods, and
        want to make admin and guest as slightly modified variants of it. We’d
        like to reuse what we have in user, not copy/reimplement its methods,
        just build a new object on top of it. Prototypal inheritance is a
        language feature that helps in that.
      </p>

      <h1 className="text-2xl py-3 font-bold">
        What is a unit test? Why should we write unit tests?
      </h1>

      <p>
        Let's start with the definition: Unit testing is a software testing
        method where “units”—the individual components of software—are tested.
        Developers write unit tests for their code to make sure that the code
        works correctly. This helps to detect and protect against bugs in the
        future.
      </p>
      <h1 className="text-2xl py-3 font-bold">React vs. Angular vs. Vue?</h1>
      <p>
        {" "}
        There are three frameworks for building web applications that every
        frontend developer has heard about: React, Vue.js, and Angular. React is
        a UI library, Angular is a fully-fledged front-end framework, while
        Vue.js is a progressive framework. They can be used almost
        interchangeably to build front-end applications, but they’re not 100
        percent the same, so it makes sense to compare them and understand their
        differences. Each framework is component-based and allows the rapid
        creation of UI features. However, they all have a different structure
        and architecture — so first, we’ll look into their architectural
        differences to understand the philosophy behind them.
      </p>
    </div>
  );
};

export default Blogs;

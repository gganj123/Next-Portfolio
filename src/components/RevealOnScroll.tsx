import React from 'react';

const RevealOnScroll = () => {
  return (
    <>
      <div className="logo"></div>
      <div className="header">
        <div className="letters">
          <div>a</div>
          <div>r</div>
          <div>t</div>
          <div>w</div>
        </div>
        <div className="letters">
          <div>o</div>
          <div>r</div>
          <div>k</div>
          <div>s</div>
        </div>
      </div>
      <div className="img-holder">
        <img src="./basecamp.jpg" alt="" />
        <div className="content-holder">
          <div className="row">
            <h1>Project</h1>
          </div>
          <div className="row">
            <div className="img">
              <img src="./japan.jpg" alt="" />
            </div>
          </div>
          <div className="row">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum nobis labore delectus illo voluptatem
              temporibus a dolorem, incidunt tempore sequi aliquam ea deleniti tenetur natus ullam corporis consequuntur
              qui itaque!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RevealOnScroll;

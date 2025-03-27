import React from "react";
import styled from "styled-components";
import simchip from "../../public/sim-card-chip.jpg"
import Image from "next/image";

const ATMCARD = () => {
  return (
    <StyledWrapper>
      <div className="flip-card">
        <div className="flip-card-inner">
          {/* Front of the Card */}
          <div className="flip-card-front">
            <p className="heading">MASTERCARD</p>
            <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
              <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
              <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
            </svg>
            {/* <svg className="chip" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
             
            </svg> */}
             <Image
                width={50}
                height={50}
                src={simchip}
                alt="Sim Card Chip"
                className="mt-14 ml-4"            
              />
            <p className="number mt-3">**** **** **** 1234</p>
            <p className="valid-thru">VALID THRU</p>
            <p className="date">12/27</p>
            <p className="name">JOHN DOE</p>
          </div>

          {/* Back of the Card */}
          <div className="flip-card-back">
            <div className="strip" />
            <div className="mstrip" />
            <div className="sstrip">
              <p className="code">***</p>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 300px;
    height: 180px;
    perspective: 1000px;
    color: white;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 1rem;
    box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
  }

  .flip-card-front {
    background: linear-gradient(to right, #171717, #1f1f1f);
  }

  .flip-card-back {
    background: linear-gradient(to right, #1f1f1f, #171717);
    transform: rotateY(180deg);
  }

  .heading {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 0.1em;
  }

  .logo {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
  }

  .chip {
    position: absolute;
    top: 60px;
    left: 20px;
    width: 40px;
    height: 40px;
  }

  .number {
    position: absolute;
    bottom: 60px;
    left: 20px;
    font-size: 1.2rem;
    letter-spacing: 0.2em;
  }

  .valid-thru {
    position: absolute;
    bottom: 40px;
    left: 20px;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .date {
    position: absolute;
    bottom: 40px;
    left: 100px;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .name {
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 1rem;
    font-weight: bold;
  }

  .strip {
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    height: 40px;
    background: black;
  }

  .mstrip {
    position: absolute;
    top: 80px;
    left: 20px;
    width: 200px;
    height: 30px;
    background: white;
    border-radius: 5px;
  }

  .sstrip {
    position: absolute;
    top: 80px;
    right: 20px;
    width: 80px;
    height: 30px;
    background: white;
    border-radius: 5px;
  }

  .code {
    position: absolute;
    top: 85px;
    right: 30px;
    font-size: 1rem;
    font-weight: bold;
    color: black;
  }
`;

export default ATMCARD;
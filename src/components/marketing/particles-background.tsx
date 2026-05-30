"use client";

import { useEffect, useState } from "react";

import Particles from "@tsparticles/react";

import { loadSlim } from "@tsparticles/slim";

import type {
  Engine,
  ISourceOptions,
} from "@tsparticles/engine";

export function ParticlesBackground() {

  const [
    init,
    setInit,
  ] = useState(false);

  useEffect(() => {

    const initParticles =
      async () => {

        const engine =
          await import(
            "@tsparticles/engine"
          );

        await loadSlim(
          engine
            .tsParticles as unknown as Engine
        );

        setInit(true);
      };

    initParticles();

  }, []);

  const options:
    ISourceOptions = {

    fullScreen: false,

    background: {
      color: {
        value:
          "transparent",
      },
    },

    fpsLimit: 60,

    particles: {

      shadow: {
        enable: true,

        color: "#22D3EE",

        blur: 15,
    },
        
      number: {
        value: 120,
      },

      color: {
        value: [
          "#7C3AED",
          "#22D3EE",
          "#FFFFFF",
        ],
      },

      links: {
        enable: true,

        distance: 180,

        color:
          "#22D3EE",

        opacity: 0.5,

        width: 2,
      },

      move: {
        enable: true,

        speed: 1,

        direction:
          "none",

        random: true,

        straight: false,

        outModes: {
          default:
            "bounce",
        },
      },

      opacity: {
        value: 0.7,
      },

      size: {
        value: {
          min: 5,
          max: 10,
        },
      },
    },

    interactivity: {
      events: {
        onHover: {
          enable: true,

          mode:
            "grab",
        },
      },

      modes: {
        grab: {
          distance: 180,

          links: {
            opacity: 0.5,
          },
        },
      },
    },

    detectRetina: true,
  };

  if (!init)
    return null;

  return (
    <Particles
      id="tsparticles"

      options={options}

      className="absolute inset-0 z-0"
    />
  );
}
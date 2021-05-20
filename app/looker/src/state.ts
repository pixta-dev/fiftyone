/**
 * Copyright 2017-2021, Voxel51, Inc.
 */

import { colorGenerator, ColorGenerator } from "./color";
import { Overlay } from "./overlays/base";

interface BaseOptions {
  activeLabels: string[];
  colorByLabel: boolean;
  colorGenerator: ColorGenerator;
  filter: ((label: { label?: string; confidence?: number }) => boolean) | null;
  colorMap: ((key: string | number | null | undefined) => string) | null;
  selectedLabels: string[];
  showAttrs: boolean;
  showConfidence: boolean;
  showTooltip: boolean;
  onlyShowHoveredLabel: boolean;
  zoom: boolean;
  smoothMasks: boolean;
}

export type BoundingBox = [number, number, number, number];

export type Coordinates = [number, number];

export type Dimensions = [number, number];

interface BaseConfig {
  thumbnail: boolean;
  src: string;
}

export interface FrameConfig extends BaseConfig {
  frameRate: number;
  frameNumber: number;
}

export interface ImageConfig extends BaseConfig {}

export interface VideoConfig extends BaseConfig {
  frameRate: number;
}

export interface FrameOptions extends BaseOptions {
  useFrameNumber: boolean;
}

export interface ImageOptions extends BaseOptions {}

export interface VideoOptions extends BaseOptions {
  useFrameNumber: boolean;
  autoplay: boolean;
  loop: boolean;
}

export interface TooltipOverlay {
  color: string;
  field: string;
  frameNumber?: number;
  label: object;
  target?: number;
  type:
    | "Classification"
    | "Detection"
    | "Keypoint"
    | "Polyline"
    | "Segmentation";
}

export interface BaseState {
  cursorCoordinates: Coordinates;
  box: BoundingBox;
  disableControls: boolean;
  focused: boolean;
  loaded: boolean;
  hovering: boolean;
  hoveringControls: boolean;
  showControls: boolean;
  showOptions: boolean;
  config: BaseConfig;
  options: BaseOptions;
  scale: number;
  pan: Coordinates;
  rotate: number;
}

export interface FrameState extends BaseState {
  config: FrameConfig;
  options: FrameOptions;
  duration: number | null;
}

export interface ImageState extends BaseState {
  config: ImageConfig;
  options: ImageOptions;
}

export interface VideoState extends BaseState {
  config: VideoConfig;
  options: VideoOptions;
  seeking: boolean;
  playing: boolean;
  locked: boolean;
  frameNumber: number;
  duration: number;
  fragment?: [number, number];
}

export type Optional<T> = {
  [P in keyof T]?: Optional<T[P]>;
};

export type StateUpdate<State extends BaseState> = (
  stateOrUpdater:
    | Optional<State>
    | ((state: Readonly<State>) => Optional<State>),
  postUpdate?: (
    context: CanvasRenderingContext2D,
    state: Readonly<State>,
    overlays: Readonly<Overlay<State>[]>
  ) => void
) => void;

const DEFAULT_BASE_OPTIONS = {
  activeLabels: [],
  colorByLabel: false,
  selectedLabels: [],
  showAttrs: false,
  showConfidence: false,
  showTooltip: false,
  onlyShowHoveredLabel: false,
  zoom: false,
  filter: null,
  colorMap: null,
  colorGenerator: colorGenerator,
  smoothMasks: true,
};

export const DEFAULT_FRAME_OPTIONS = {
  ...DEFAULT_BASE_OPTIONS,
  useFrameNumber: true,
};

export const DEFAULT_IMAGE_OPTIONS = {
  ...DEFAULT_BASE_OPTIONS,
};

export const DEFAULT_VIDEO_OPTIONS = {
  ...DEFAULT_BASE_OPTIONS,
  useFrameNumber: false,
  autoplay: false,
  loop: false,
};
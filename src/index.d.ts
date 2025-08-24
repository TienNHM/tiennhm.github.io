declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module '*.webp';

declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}
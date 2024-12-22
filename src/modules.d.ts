declare module '*?source' {
  const value: unknown; // better convert to avif using ?source&as=avif or type to string if really needed
  export default value;
}

declare module '*?resource' {
  const value: unknown; // better convert to avif using ?resource&as=avif or type to string if really needed
  export default value;
}

declare module '*?inline' {
  const value: unknown; // better convert to avif using ?inline&as=avif or type to string if really needed
  export default value;
}

declare module '*?asset' {
  const value: unknown; // better convert to avif using ?asset&as=avif or type to string if really needed
  export default value;
}

declare module '*&as=avif' {
  const value: string;
  export default value;
}

declare module '*&as=webp' {
  const value: unknown; // better convert to avif using *&as=avif or type to string if really needed
  export default value;
}

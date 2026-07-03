function FeatureCard({ icon: Icon, titulo, descripcion }) {
  return (
    <article className="feature-card">
      <Icon size={25} />
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </article>
  );
}

export default FeatureCard;

const AboutTab = ({ about }: any) => {
  return (
    <div className="bg-card p-5 rounded-xl border">
      <h3 className="font-semibold mb-3">About</h3>
      <p className="text-sm text-muted-foreground">{about}</p>
    </div>
  );
};

export default AboutTab;
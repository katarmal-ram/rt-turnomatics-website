
import { Button } from "@/components/ui/button";

interface LeadershipSectionProps {
  data: {
    enabled: boolean;
    title: string;
    subtitle: string;
    members: Array<{
      name: string;
      position: string;
      bio: string;
      image: string;
      linkedin?: string;
    }>;
  };
}

export const LeadershipSection = ({ data }: LeadershipSectionProps) => {
  if (!data.enabled) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.members.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="p-6">
                <div className="mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {member.bio}
                </p>
                {member.linkedin && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(member.linkedin, '_blank')}
                  >
                    LinkedIn
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function FeatureCard({ icon: Icon, title, description }) {
    return (
        <div className="bg-white rounded-xl border border-border-purple p-5 md:p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200">
            <div className="bg-magenta-secondary p-2.5 rounded-xl mb-3 md:mb-4">
                <div className="w-12 h-12 md:w-13 md:h-13 rounded-lg border-dashed border-brand-200 flex items-center justify-center bg-surface">
                    <Icon size={20} className="text-magenta-tertiary" />
                </div>
            </div>

            <h3 className="text-base font-medium text-text-primary mb-2">{title}</h3>

            <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
        </div>
    )
}

export default FeatureCard;
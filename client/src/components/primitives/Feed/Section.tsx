import Flexbox from "../Flexbox"

type SectionProps = {
    navigation?: React.ReactNode;
    feed?: React.ReactNode;
    info?: React.ReactNode;
}

export const Section = (props:SectionProps) => {
    return(
        <Flexbox padding="md" className="gap-6 mx-auto max-w-container justify-center">
                {props.navigation}
            <div className="w-full max-w-[592px]">
                {props.feed}
            </div>
                {props.info}
        </Flexbox>
    )
}

export default Section;
import tw, { styled } from "twin.macro";
const LabelWrapper = styled.label(({ labelKey }) => [
    tw`bg-green-600 w-max px-3 py-1 rounded-2xl font-poppins font-semibold text-xs md:text-sm text-white text-center`,
    `${labelKey === 0 ? tw`mt-2` : ''}`
]);

function Label({ labelKey, labelName }){
    return(
        <LabelWrapper labelKey={labelKey}>{labelName}</LabelWrapper>
    )
}
export default Label;
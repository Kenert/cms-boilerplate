const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

const exampleBlock = registerBlockType('rwd/example', {
    title: 'Example Title',
    description: 'Example Description',
    icon: 'format-image',
    category: 'text',
    supports: {
        className: false
    },
    attributes: {
        content: {
            selector: 'div',
            source: 'children'
        }
    },
    edit(props) {
        const onChangeContent = (newContent) => {
            props.setAttributes({ content: newContent });
        };
        return (
            <RichText
                format='string'
                onChange={onChangeContent}
                value={props.attributes.content}
                placeholder='Example Placeholder'
            />
        );
    },

    save(props) {
        return <div>{props.attributes.content}</div>;
    }
});

export default exampleBlock;

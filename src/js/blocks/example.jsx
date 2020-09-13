import { registerBlockType } from 'wp.blocks';

const exampleBlock = registerBlockType('rwd/example', {
    title: 'Example Title',
    description: 'Example Description',
    icon: 'format-image',
    category: 'text',

    attributes: {},

    edit() {
        return <div>Example</div>;
    },

    save() {
        return <div>Example</div>;
    }
});

export default exampleBlock;

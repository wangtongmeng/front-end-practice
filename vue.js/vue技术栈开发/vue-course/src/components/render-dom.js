export default {
	functional: true,
	props: {
		// name: String,
		number: Number,
		renderFunc: Function
	},
	render: (h, ctx) => {
		// return ctx.props.renderFunc(h, ctx.props.name)
		return ctx.props.renderFunc(h, ctx.props.number)
	}
}
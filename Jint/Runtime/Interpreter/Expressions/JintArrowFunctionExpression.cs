using System.Collections.Generic;
using Esprima.Ast;

namespace Jint.Runtime.Interpreter.Expressions
{
    internal sealed class JintArrowFunctionExpression : JintExpression
    {
        private readonly JintFunctionExpression _inner;

        public JintArrowFunctionExpression(Engine engine, ArrowFunctionExpression expression) : base(engine, ArrowParameterPlaceHolder.Empty)
        {
            var statement = expression.Expression
                ? new BlockStatement(new List<StatementListItem> { new ReturnStatement(expression.Body.As<Expression>()) })
                : expression.Body.As<BlockStatement>();

            var function = new FunctionExpression(new Identifier(null),
                expression.Params,
                statement,
                false,
                expression.HoistingScope,
                StrictModeScope.IsStrictModeCode);

            _inner = new JintFunctionExpression(engine, function);
        }

        protected override object EvaluateInternal()
        {
            return _inner.Evaluate();
        }
    }
}
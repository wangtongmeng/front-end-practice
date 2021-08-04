import {
  expectType,
  $ref,
  $computed,
  $fromRefs,
  $raw,
  ref,
  Ref,
  ComputedRef
} from './index'

// $ref
expectType<number>($ref(1))
expectType<number>($ref(ref(1)))
expectType<{ foo: number }>($ref({ foo: ref(1) }))

// $computed
expectType<number>($computed(() => 1))
let b = $ref(1)
expectType<number>($computed(() => b))

function useFoo() {
  return {
    x: ref(1),
    y: ref('hi'),
    z: 123
  }
}

// $fromRefs
const { x, y, z } = $fromRefs(useFoo())
expectType<number>(x)
expectType<string>(y)
expectType<number>(z)

// $raw
expectType<Ref<number>>($raw(x))
expectType<Ref<string>>($raw(y))

const c = $computed(() => 1)
const cRef = $raw(c)
expectType<ComputedRef<number>>(cRef)

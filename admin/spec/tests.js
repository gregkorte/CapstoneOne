// /* global describe, it */
// (function () {
// 	'use strict';
// 	describe('Give it some context', function () {
// 		describe('maybe a bit more context here', function () {
// 			it('should run here few assertions', function () {
// 			});
// 		});
// 	});
// })()

describe('preamble', function(){
	it('should print my name out', function(){
		assert.equal(preamble("Greg"), "Your name is Greg!");
		assert.equal(preamble("Korte"), "Your name is Korte!");
	})
});

describe('cheerFor', function(){
	it('should print the cheer out', function(){
		expectedCheer = "Give me a... G!\nGive me a... R!";
		assert.equal(cheerFor("GR"), expectedCheer);

		expectedCheer = "Give me a... B!\nGive me a... O!\nGive me a... B!";
		assert.equal(cheerFor("BOB"), expectedCheer);
	})
});

describe('postamble', function(){
	it('should print the postamble out', function(){
	assert.equal(postamble("Greg"), "Greg is great!");
	})
});

describe('uppercase', function(){
	it('should print the cheer out with caps', function(){
		expectedCheer = "Give me a... G!\nGive me a... R!";
		assert.equal(uppercase("Gr"), expectedCheer);

		expectedCheer = "Give me a... B!\nGive me a... O!\nGive me a... B!";
		assert.equal(uppercase("bob"), expectedCheer);
	})
});

describe('grammar', function(){
	it('should print the cheer out with grammar and caps', function(){
		expectedCheer = "Give me a... G!\nGive me an... R!";
		assert.equal(grammar("Gr"), expectedCheer);

		expectedCheer = "Give me an... M!\nGive me an... O!\nGive me a... V!\nGive me an... I!\nGive me an... E!\nGive me an... S!\nGive me a... T!\nGive me an... A!\nGive me an... R!";
		assert.equal(grammar("Moviestar"), expectedCheer);	
	})
});


/////////////////QUnit Testing/////////////////////

// QUnit.test("preamble(name)", function(assert) {
// assert.equal(preamble("Greg"), "Your name is Greg!");
// assert.equal(preamble("Korte"), "Your name is Korte!");
// });

// QUnit.test("cheerFor(name)", function(assert) {
// expectedCheer = "Give me a... G!\nGive me a... R!";
// assert.equal(cheerFor("GR"), expectedCheer);

// expectedCheer = "Give me a... B!\nGive me a... O!\nGive me a... B!";
// assert.equal(cheerFor("BOB"), expectedCheer);

// //TODO: Names with spaces or hyphens; Empty strings; NUmbers; Vowel sounds; Names with lowercsae letters.
// });

// QUnit.test("postamble(name)", function(assert){
// 	assert.equal(postamble("Greg"), "Greg is great!");
// });

// QUnit.test("uppercase(name)", function(assert){
// 	expectedCheer = "Give me a... G!\nGive me a... R!";
// 	assert.equal(uppercase("Gr"), expectedCheer);

// 	expectedCheer = "Give me a... B!\nGive me a... O!\nGive me a... B!";
// 	assert.equal(uppercase("bob"), expectedCheer);
// });

// QUnit.test("grammar(name)", function(assert){
// 	expectedCheer = "Give me a... G!\nGive me an... R!";
// 	assert.equal(grammar("Gr"), expectedCheer);

// 	expectedCheer = "Give me an... M!\nGive me an... O!\nGive me a... V!\nGive me an... I!\nGive me an... E!\nGive me an... S!\nGive me a... T!\nGive me an... A!\nGive me an... R!";
// 	assert.equal(grammar("Moviestar"), expectedCheer);
// });
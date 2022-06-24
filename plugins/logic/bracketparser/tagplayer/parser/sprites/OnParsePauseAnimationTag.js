const GetValue = Phaser.Utils.Objects.GetValue;

var IsPauseAnimationTag = function (tags, prefix) {
    // sprite.name.pause 
    return (tags.length === 3) && (tags[0] === prefix) && (tags[2] === 'pause');
}

var OnParsePauseAnimationTag = function (tagPlayer, parser, config) {
    var prefix = GetValue(config, 'sprite', 'sprite');
    if (!prefix) {
        return;
    }
    parser
        .on('+', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [sprite.name.chain=key]
            var tags = tag.split('.');
            var name;
            if (IsPauseAnimationTag(tags, prefix)) {
                name = tags[1];
            } else {
                return;
            }
            tagPlayer.spriteManager.pauseAnimation(name);

            parser.skipEvent();
        })
}

export default OnParsePauseAnimationTag;
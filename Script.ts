class Music
{
	Root: string[] = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
	
	Scales = 
	[
		{ Scale: "Natural Major", Pattern: [2,2,1,2,2,2,1], Image: 'Major' },
		{ Scale: "Natural Minor", Pattern: [2,1,2,2,1,2,2], Image: 'Minor' },
		{ Scale: "Pentatonic Major", Pattern: [2,2,3,2,3], Image: 'Major' },
		{ Scale: "Pentatonic Minor", Pattern: [3,2,2,3,2], Image: 'Minor' },
		{ Scale: "Blues", Pattern: [3,2,1,1,3,2], Image: undefined },
		{ Scale: "Harmonic Minor", Pattern: [2,1,2,2,1,3,2], Image: 'Minor' },
		{ Scale: "Melodic Minor", Pattern: [2,1,2,2,2,2,1], Image: 'Minor' }
	];
	
	Chords = 
	[
		{ Chord: "Natural Major", Pattern: ['Major','Minor','Minor','Major','Major','Minor','Diminished'] },
		{ Chord: "Natural Minor", Pattern: ['Minor','Diminished','Major','Minor','Minor','Major','Major'] },
		{ Chord: "Pentatonic Major", Pattern: undefined },
		{ Chord: "Pentatonic Minor", Pattern: undefined },
		{ Chord: "Blues", Pattern: undefined },
		{ Chord: "Harmonic Minor", Pattern: ['Minor','Diminished','Augmented','Minor','Major','Major','Diminished'] },
		{ Chord: "Melodic Minor", Pattern: ['Minor','Minor','Augmented','Major','Major','Diminished','Diminished'] }
	];
		
	constructor(nNote, nScale)
	{	
		let nImage: any;
		
		console.clear(); /* Clear Console */
		
		this.Scales.forEach
		(
			Scale =>
			{					
				if (this.Root.indexOf(nNote) !== -1)
				{					
					if (nScale == Scale['Scale']) 
					{
						nImage = Scale['Image']; /* Circle of Fifths Image */
						
						let nPattern: number[] = Scale['Pattern'];		
						
						//Keys Calculation
						let Index: number = this.Root.indexOf(nNote);

						let Keys: string = this.Root[Index] + " - ";
						
						for (let I = 0; I < nPattern.length - 1; I++)
						{										
							let Step: number = nPattern[I];
							
							Index = Index + Step;			
							
							if (Index > this.Root.length - 1) { Index = Index - this.Root.length; }
							
							Keys = Keys + this.Root[Index] + " - ";								
						}

						//Trim Keys
						Keys = Keys.substring(0, (Keys.length - 3));
					
						console.log('%cNotes: ' + Keys, 'background: #35a5e1; color: white'); /* Log */
						
						DomManipulator.SetNotes(Keys);	

						//Chords Calculation
						this.Chords.forEach
						(	
							Chord =>
							{
								if (nScale == Chord['Chord']) 
								{									
									let cPattern = Chord['Pattern'];
									
									if (cPattern != undefined)
									{
										let nChords: string = '';
										
										let SplitKeys = Keys.split(' - ');
										
										for (let In = 0; In < SplitKeys.length; In++)
										{
											nChords = nChords + SplitKeys[In] + " " + cPattern[In].toLowerCase() + " - ";											
										}
										
										//Trim Chords
										nChords = nChords.substring(0, (nChords.length - 3));
										
										console.log('%cChords: ' + nChords, 'background: #35a5e1; color: white'); /* Log */
										
										DomManipulator.SetChords(nChords);	
									}
									
									else { DomManipulator.SetChords(''); }
								};
							}
						)	

						DomManipulator.SetTitle(nNote + ' - ' + nScale);
						
						if (nImage == undefined) { DomManipulator.SetCOF('CircleOfFifths\\Init.png'); }
						
						else { DomManipulator.SetCOF('CircleOfFifths\\' + nNote + ' - ' + nImage + '.png'); }
					}; 
				};
			}		
		)
	}
	
	static Generate(nNote: string, nScale: string): any
	{
		let nMusic = new Music(nNote, nScale);
		
		return nMusic;
	}
}

class DomManipulator
{
	static SetTitle(nTitle: string): void { document.getElementById('Title').innerText = nTitle; }
	
	static SetNotes(nNotes: string): void { document.getElementById('ContentNotes').innerText = nNotes; }
	
	static SetChords(nChords: string): void { document.getElementById('ContentChords').innerText = nChords; }
	
	static SetCOF(nImg: string) 
	{ 
		let COFElement = <HTMLImageElement>(document.getElementById('COF'));
		COFElement.src = nImg; 
	}
}

function SearchEvent()
{
	let SelectedNote: string = document.getElementById((<HTMLInputElement>document.getElementById('Note')).value).innerText;
	
	let SelectedScale: string = document.getElementById((<HTMLInputElement>document.getElementById('Scale')).value).innerText;
	
	Music.Generate(SelectedNote, SelectedScale);
}
